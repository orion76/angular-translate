
import { ElementRef, Renderer2 } from '@angular/core';
import { ITranslatedService } from '../services/translated.service';
import { TTranslateLineEntity } from '../types/trans';
import { EEvents, ISelectedTranslateString } from './common';


export abstract class TransContentAbstract {

  dom: HTMLElement;
  lines: Map<string, TTranslateLineEntity>;
  elements: Map<string, HTMLElement>;
  content: ElementRef;
  protected _selectedId: any;


  constructor(protected service: ITranslatedService, protected renderer: Renderer2) { }

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

    this.service.onEvent(EEvents.MOUSE_DOWN)
      .subscribe((selected: ISelectedTranslateString) => this.onMouseDownHandler(selected.transId))

    this.service.onEvent(EEvents.MOUSE_ENTER)
      .subscribe((selected: ISelectedTranslateString) => this.onMouseEnterHandler(selected.transId))

    this.service.onEvent(EEvents.MOUSE_OUT)
      .subscribe((selected: ISelectedTranslateString) => this.onMouseOutHandler(selected.transId))

  }

  InitEvents() {
    this.service.onEvent(EEvents.MOUSE_ENTER)
      .subscribe((item: ISelectedTranslateString) => this.onMouseEnterHandler(item.transId))

    Array.from(this.dom.getElementsByTagName('trans'))
      .forEach((trans: HTMLElement) => {

        trans.innerHTML = this.lines.get(trans.id).content;

        trans.addEventListener('mouseenter', (event: MouseEvent) => this.onMouseEvent(
          EEvents.MOUSE_ENTER, (event.target as HTMLElement).id)
        );
        trans.addEventListener('mouseout', (event: MouseEvent) => this.onMouseEvent(
          EEvents.MOUSE_OUT, (event.target as HTMLElement).id)
        );
        trans.addEventListener('mousedown', (event: MouseEvent) => this.onMouseEvent(
          EEvents.MOUSE_DOWN, (event.target as HTMLElement).id)
        );
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

  onMouseDownHandler(transId: string) {

    if (this._selectedId) {
      this.renderer.removeClass(this.getElement(this._selectedId), 'trans-selected');
    }
    this._selectedId = transId;
    this.renderer.addClass(this.getElement(this._selectedId), 'trans-selected');
  }

  onMouseEnterHandler(transId: string) {
    const target: HTMLElement = this.getElement(transId);
    this.renderer.addClass(target, 'trans-mouse-enter');
  }

  onMouseOutHandler(transId: string) {
    const target: HTMLElement = this.getElement(transId);
    this.renderer.removeClass(target, 'trans-mouse-enter');
  }

  onMouseEvent(event: EEvents, transId: string) {
    this.service.do(event, transId);
  }

  debug(...args: any[]) {
    console.log(...args);
  }
}
