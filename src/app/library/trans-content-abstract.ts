import {ElementRef, Input, OnInit, Renderer2, ViewChild} from '@angular/core';
import {ITranslateService} from '@app/services/translate.service';
import {ISourceEntityTranslate, ILineEntity} from '@pages/translate/source/source.config';
import {Observable} from 'rxjs';
import {filter} from 'rxjs/operators';
import {EMouseEvent, ILineEvent, ISelectedLine} from './common';


export abstract class TransContentAbstract implements OnInit {

  // type: EEntityType;


  @Input() entity$: Observable<ISourceEntityTranslate>;
  @ViewChild('content') content: ElementRef;

  lines: Map<string, ILineEntity>;
  elements: Map<string, HTMLElement>;

  protected _selectedId: any;
  private parser = new DOMParser();

  constructor(
    protected service: ITranslateService,
    protected renderer: Renderer2
  ) {
  }

  ngOnInit() {

    this.entity$
      .pipe(filter(Boolean))
      .subscribe((entity: ISourceEntityTranslate) => {
        const template = this.getDom(entity.template);
        this._clearLinkEvent(template);
        this._addContentDom(template);
        this._fillTranslateLines();
      });
  }

  public getDom(source: string): HTMLElement {
    return this.parser.parseFromString(source, 'text/html').body;
  }

  InitEvents(originalId: string) {
    this.service.onEvent(EMouseEvent.MOUSE_ENTER).subscribe((event: ILineEvent) => {
      const target: HTMLElement = this.getElement(event.line.lineId);
      this.renderer.addClass(target, 'trans-mouse-enter');
    });


    this.service.onEvent(EMouseEvent.MOUSE_OUT).subscribe((event: ILineEvent) => {
      const target: HTMLElement = this.getElement(event.line.lineId);
      this.renderer.removeClass(target, 'trans-mouse-enter');
    });


    this.service.onLineSelect(originalId).subscribe((line: ISelectedLine) => {
      if (line.lineIdPrev) {
        this.renderer.removeClass(this.getElement(line.lineIdPrev), 'trans-selected');
      }
      this.renderer.addClass(this.getElement(line.lineId), 'trans-selected');
    });

  }

  getElement(id: string): HTMLElement {
    return this.content.nativeElement.querySelector('#' + id);
  }

  getTransElements(): Map<string, HTMLElement> {

    return Array.from(this.content.nativeElement.getElementsByTagName('trans'))
      .map((node: HTMLElement) => {
        return {id: node.id, node};
      }).reduce((acc: Map<string, HTMLElement>, {id, node}) => {
        acc.set(id, node);
        return acc;
      }, new Map());
  }

  debug(...args: any[]) {
    console.log(...args);
  }

  private _addContentDom(template: HTMLElement) {
    Array.from(template.childNodes)
      .reverse()
      .forEach((node: Node) => {
        this.renderer.appendChild(this.content.nativeElement, node);
      });
  }

  private _fillTranslateLines() {
    this.elements = this.getTransElements();
    this.elements.forEach((node: HTMLElement, transId: string) => {
      node.textContent = this.lines.get(transId).content;
    });
  }

  private _clearLinkEvent(dom: HTMLElement) {
    Array.from(dom.getElementsByTagName('a')).forEach((link: HTMLElement) => {
      link.addEventListener('click', (event: MouseEvent) => {

        event.preventDefault();

      });
    });
  }
}
