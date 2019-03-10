
import { ElementRef, EventEmitter, Renderer2 } from '@angular/core';
import { TransCommonService } from '../services/trans-common.service';
import { ITranslateData, TTranslateMode, ISelectedTranslateString, EEvents } from './common';
import { getTextNodes } from './dom';
import { filter, tap } from 'rxjs/operators';

export abstract class TransContentAbstract {

  dom: HTMLElement;
  data: Map<string, ITranslateData>;
  selectedChange = new EventEmitter();
  content: ElementRef;
  protected _selectedId: any;

  abstract mode: TTranslateMode;


  protected textNodes: HTMLElement[];
  public nodesCount: number = 0;


  constructor(protected service: TransCommonService, protected renderer: Renderer2) { }

  ngOnInit() {
    this.textNodes = getTextNodes(this.dom);
    this.InitEvents();
    this.clearLinkEvent(this.dom);

    Array.from(this.dom.childNodes)
      .reverse()
      .forEach((node: Node) => {
        this.renderer.appendChild(this.content.nativeElement, node);
      })

    this.nodesCount = this.textNodes.length;

    this.service.onEvent(EEvents.MOUSE_DOWN)
      .subscribe((selected: ISelectedTranslateString) => this.onMouseDownHandler(selected.transId))

    this.service.onEvent(EEvents.MOUSE_ENTER)
      .subscribe((selected: ISelectedTranslateString) => this.onMouseEnterHandler(selected.transId))

this.service.onEvent(EEvents.MOUSE_OUT)
      .subscribe((selected: ISelectedTranslateString) => this.onMouseOutHandler(selected.transId))

  }

  InitEvents() {
    this.service.onEvent(EEvents.MOUSE_ENTER)
      .subscribe((item: ISelectedTranslateString) => this.onMouseEnterHandler(item.source))

    Array.from(this.dom.getElementsByTagName('trans'))
      .forEach((trans: HTMLElement) => {

        trans.innerHTML = this.data.get(trans.id).origin;

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

  onMouseDownHandler(transId: string) {

    const target: HTMLElement = this.getElement(transId);

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
    this.service.do(event, this.mode, transId);
  }

  debug(...args: any[]) {
    console.log(...args);
  }
}
