
import { ElementRef, Input, Renderer2, ViewChild } from '@angular/core';
import { ITranslateService } from '@app/services/translate.service';
import { ILineEntity, ITranslateEntity } from '@app/types/trans';
import { Observable } from 'rxjs';
import { EMouseEvent, ILineEvent, ISelectedLine } from './common';
import { filter } from 'rxjs/operators';


export abstract class TransContentAbstract {

  // type: EEntityType;


  @Input() entity$: Observable<ITranslateEntity>;
  @ViewChild("content") content: ElementRef;

  lines: Map<string, ILineEntity>;
  elements: Map<string, HTMLElement>;

  protected _selectedId: any;


  constructor(

    protected service: ITranslateService,
    protected renderer: Renderer2
  ) { }

  ngOnInit() {
    this.entity$
      .pipe(filter(Boolean))
      .subscribe((entity: ITranslateEntity) => {
        this._clearLinkEvent(entity.template);
        this._addContentDom(entity.template);
        this._fillTranslateLines();
      });
  }

  private _addContentDom(template: HTMLElement) {
    Array.from(template.childNodes)
      .reverse()
      .forEach((node: Node) => {
        this.renderer.appendChild(this.content.nativeElement, node);
      })
  }

  private _fillTranslateLines() {
    this.elements = this.getTransElements();
    this.elements.forEach((node: HTMLElement, transId: string) => {
      node.textContent = this.lines.get(transId).content;
    })
  }

  InitEvents(originalId: string) {
    this.service.onEvent(EMouseEvent.MOUSE_ENTER).subscribe((event: ILineEvent) => {
      const target: HTMLElement = this.getElement(event.line.lineId);
      this.renderer.addClass(target, 'trans-mouse-enter');
    })


    this.service.onEvent(EMouseEvent.MOUSE_OUT).subscribe((event: ILineEvent) => {
      const target: HTMLElement = this.getElement(event.line.lineId);
      this.renderer.removeClass(target, 'trans-mouse-enter');
    })


    this.service.onLineSelect(originalId).subscribe((line: ISelectedLine) => {
      if (line.lineIdPrev) {
        this.renderer.removeClass(this.getElement(line.lineIdPrev), 'trans-selected');
      }
      this.renderer.addClass(this.getElement(line.lineId), 'trans-selected');
    })

  }

  private _clearLinkEvent(dom: HTMLElement) {
    Array.from(dom.getElementsByTagName('a')).forEach((link: HTMLElement) => {
      link.addEventListener('click', (event: MouseEvent) => {

        event.preventDefault();

      })
    })
  }

  getElement(id: string): HTMLElement {
    return this.content.nativeElement.querySelector('#' + id);
  }

  getTransElements(): Map<string, HTMLElement> {

    return Array.from(this.content.nativeElement.getElementsByTagName('trans'))
      .map((node: HTMLElement) => {
        return { id: node.id, node }
      }).
      reduce((acc: Map<string, HTMLElement>, { id, node }) => {
        acc.set(id, node);
        return acc;
      }, new Map())
  }

  debug(...args: any[]) {
    console.log(...args);
  }
}
