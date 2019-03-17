
import { ElementRef, Renderer2 } from '@angular/core';
import { ITranslateService } from '../services/translate.service';
import { TTranslateLineEntity } from '../types/trans';
import { ETranslateEvents, ISelectedLine } from './common';


export abstract class TransContentAbstract {

  dom: HTMLElement;
  lines: Map<string, TTranslateLineEntity>;
  elements: Map<string, HTMLElement>;
  content: ElementRef;
  protected _selectedId: any;


  constructor(
    protected service: ITranslateService,
    protected renderer: Renderer2
  ) { }

  ngOnInit() {


    this.InitEvents();
    this.clearLinkEvent(this.dom);

    Array.from(this.dom.childNodes)
      .reverse()
      .forEach((node: Node) => {
        this.renderer.appendChild(this.content.nativeElement, node);
      })
    this.elements = this.getTransElements();
    this.elements.forEach((node: HTMLElement, transId: string) => {
      node.textContent = this.lines.get(transId).content;
    })


  }

  InitEvents() {

    Array.from(this.dom.getElementsByTagName('trans'))
      .forEach((trans: HTMLElement) => {

        trans.innerHTML = this.lines.get(trans.id).content;

        trans.addEventListener('mouseenter', (event: MouseEvent) => this.service.do(
          ETranslateEvents.MOUSE_ENTER, (event.target as HTMLElement).id)
        );
        trans.addEventListener('mouseout', (event: MouseEvent) => this.service.do(
          ETranslateEvents.MOUSE_OUT, (event.target as HTMLElement).id)
        );
        trans.addEventListener('mousedown', (event: MouseEvent) => this.service.do(
          ETranslateEvents.MOUSE_DOWN, (event.target as HTMLElement).id)
        );
      })

    this.service.onEvent(ETranslateEvents.MOUSE_ENTER)
      .subscribe((line: ISelectedLine) => {
        const target: HTMLElement = this.getElement(line.transId);
        this.renderer.addClass(target, 'trans-mouse-enter');
      })


    this.service.onEvent(ETranslateEvents.MOUSE_OUT)
      .subscribe((line: ISelectedLine) => {
        const target: HTMLElement = this.getElement(line.transId);
        this.renderer.removeClass(target, 'trans-mouse-enter');
      })


    this.service.onLineSelect().subscribe((line: ISelectedLine) => {

      if (this._selectedId) {
        this.renderer.removeClass(this.getElement(this._selectedId), 'trans-selected');
      }
      this._selectedId = line.transId;
      this.renderer.addClass(this.getElement(this._selectedId), 'trans-selected');
    })
    // this.preparedSource = dom.body.innerHTML;
  }

  clearLinkEvent(dom: HTMLElement) {
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
