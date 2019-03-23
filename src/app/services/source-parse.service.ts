import { Injectable } from '@angular/core';
import { IEntityOriginal, EEntityType, ELanguage } from '@app/types';


export interface ISourceParseService {
  parse(source: string, language: string, authorId: string): IEntityOriginal;
  prepareLinks(source: string, url: string);
}

@Injectable()
export class SourceParseService implements ISourceParseService {

  private parser = new DOMParser();

  public parse(source: string, language: ELanguage, authorId: string): IEntityOriginal {


    const entity: IEntityOriginal = {
      type: EEntityType.original,
      entityId: null,
      authorId,
      language,
      lines: new Map(),
      template: null,

    }


    const dom = this.parser.parseFromString(source, 'text/html');
    const textNodes: HTMLElement[] = this.getTextNodes(dom);

    let transId = 1;

    textNodes.forEach((node: HTMLElement) => {
      const trans = dom.createElement('trans');

      trans.id = `trans-id-${transId}`;
      trans.textContent = '';

      entity.lines.set(trans.id, {
        entityId: transId.toString(),
        type: EEntityType.original,
        content: node.textContent,
      })

      node.parentNode.replaceChild(trans, node);
      transId++;
    })

    entity.template = dom.body;
    return entity;
  }

  protected getTextNodes(elem: Node) {
    return this._getTextNodes(elem)
      .filter((node: Node) => Boolean(node.textContent.trim()))
      .filter((node: Node) => node.textContent.match(/[\S]+/));;
  }
  public prepareLinks(source: string, url: string) {

    const dom = this.parser.parseFromString(source, 'text/html');

    Array.from(dom.getElementsByTagName("a"))
      .filter(this.isLinkExternal)

  }

  protected isLinkExternal(link: HTMLAnchorElement) {
    if (link.hostname) {
      console.log(
        link.href + '\n' +           // the full URL
        link.protocol + '\n' +       // http:
        link.hostname + '\n' +       // site.com
        link.port + '\n' +           // 81
        link.pathname + '\n' +       // /path/page
        link.search + '\n' +         // ?a=1&b=2
        link.hash                    // #hash
      )

    }

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
