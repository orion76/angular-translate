import { Injectable } from '@angular/core';
import { ITransEntity } from './data.service';

export interface ISourceParseService {
  parse(source: string, language: string, autorId: string): ITransEntity;
}

@Injectable()
export class SourceParseService implements ISourceParseService {
  public parse(source: string, language: string, autorId: string): ITransEntity {


    const entity: ITransEntity = {
      original: new Map(),
      template: null,
      translated: new Map()
    }

    const parser = new DOMParser();
    const dom = parser.parseFromString(source, 'text/html');
    const textNodes: HTMLElement[] = this.getTextNodes(dom);

    let transId = 1;

    textNodes.forEach((node: HTMLElement) => {
      const trans = dom.createElement('trans');

      trans.id = `trans-id-${transId}`;
      trans.textContent = '';


      entity.original.set(trans.id, {
        transId: trans.id,
        language,
        autorId,
        content: node.textContent,
        translated: true
      })

      entity.translated.set(trans.id, {
        transId: trans.id,
        language,
        autorId,
        content: node.textContent,
        translated: false
      })

      node.parentNode.replaceChild(trans, node);
      transId++;
    })

    entity.template = dom.body.innerHTML;
    return entity;
  }

  protected getTextNodes(elem: Node) {
    return this._getTextNodes(elem)
      .filter((node: Node) => Boolean(node.textContent.trim()))
      .filter((node: Node) => node.textContent.match(/[\S]+/));;
  }

  protected _getTextNodes(elem: Node) {
    var textNodes = [];
    if (this.hasChildren(elem)) {

      Array.from(elem.childNodes).forEach((node: Node) => {
        if (node.nodeType == Node.TEXT_NODE) {
          textNodes.push(node);
        }
        else {
          textNodes = textNodes.concat(this._getTextNodes(node));
        }

      })
    }
    return textNodes;
  }

  protected hasChildren(elem: Node) {
    return (
      elem.nodeType === Node.ELEMENT_NODE
      || elem.nodeType === Node.DOCUMENT_NODE
      || elem.nodeType === Node.DOCUMENT_FRAGMENT_NODE)
  }
}
