import {Injectable} from '@angular/core';
import {EEntityType, ILineEntity, ISourceEntityTranslate} from '@app/types';
import {UrlObject} from 'url';
import {createEntity} from '@xangular-common/entity';
import * as Immutable from 'immutable';
import {TEntityFields} from '@app-library/components/form/types';
import {ISourceEntityTranslateLine} from '@pages/translate/source/source.config';


export interface ISourceParseService {
  parse(
    source: string,
    entity: Immutable.RecordOf<ISourceEntityTranslate>,
    translateConfig: TEntityFields<ISourceEntityTranslate>,
    lineConfig: TEntityFields<ISourceEntityTranslateLine>,
  ): Immutable.RecordOf<ISourceEntityTranslate>;

  prepareHTMLSource(source, sourceUrl: string): string;
}

@Injectable()
export class SourceParseService implements ISourceParseService {

  private parser = new DOMParser();

  public getDom(source: string): Document {
    return this.parser.parseFromString(source, 'text/html');
  }

  public prepareHTMLSource(source, sourceUrl: string): string {
    const dom = this.getDom(source);
    this.prepareLinks(dom.body, sourceUrl);
    this.prepareImages(dom.body, sourceUrl);
    return dom.body.innerHTML;
  }

  public parse(
    source: string,
    entity: Immutable.RecordOf<ISourceEntityTranslate>,
    translateConfig: TEntityFields<ISourceEntityTranslate>,
    lineConfig: TEntityFields<ISourceEntityTranslateLine>,
  ): Immutable.RecordOf<ISourceEntityTranslate> {

    // const entity = createEntity<IEntityTranslate>(
    //   source,
    //   null
    //   , {lines: Immutable.OrderedMap()});

    const dom = this.getDom(source);
    const textNodes: HTMLElement[] = this.getTextNodes(dom);

    let transId = 1;

    const lines = new Map();

    textNodes.forEach((node: HTMLElement) => {
      const trans = dom.createElement('trans');

      trans.id = `trans-id-${transId}`;
      trans.textContent = '';

      // const options: IKeyValueList<IFieldOptions> = {
      //   label: {type: 'attribute'},
      //   language: {type: 'attribute'},
      //   content: {type: 'attribute'},
      // };


      const line = createEntity<ILineEntity>(EEntityType.translate_line, transId.toString(), lineConfig, {
        label: node.textContent.slice(0, 128),
        langcode: entity.langcode,
        content: node.textContent
      });

      lines.set(trans.id, line);

      node.parentNode.replaceChild(trans, node);
      transId++;
    });

    return entity.withMutations((record: Immutable.RecordOf<ISourceEntityTranslate>) => {
      record.set('lines', lines);
      record.set('template', dom.body.outerHTML);
    });

  }

  public prepareLinks(dom: HTMLElement, sourceUrl: string) {

    const url = new URL(sourceUrl);
    // const dom = this.parser.parseFromString(source, 'text/html');

    Array.from(dom.getElementsByTagName('a'))
      .filter(this.isLinkInternal)
      .map((link: HTMLAnchorElement) => this.prepareLink(link, url));

  }

  public prepareImages(dom: HTMLElement, sourceUrl: string) {

    const url = new URL(sourceUrl);
    // const dom = this.parser.parseFromString(source, 'text/html');

    Array.from(dom.getElementsByTagName('img'))
      .filter((img: HTMLImageElement) => this.isLinkInternal(new URL(img.src)))
      .map((img: HTMLImageElement) => this.prepareImg(img, url));

  }

  protected getTextNodes(elem: Node) {
    return this._getTextNodes(elem)
      .filter((node: Node) => Boolean(node.textContent.trim()))
      .filter((node: Node) => node.textContent.match(/[\S]+/));
  }

  protected isLinkInternal(url: UrlObject): boolean {
    return url.hostname.length === 0 || location.hostname === url.hostname;
  }

  protected _getTextNodes(elem: Node) {
    let textNodes = [];
    if (this.hasChildren(elem)) {

      Array.from(elem.childNodes).forEach((node: Node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          textNodes.push(node);
        } else {
          textNodes = textNodes.concat(this._getTextNodes(node));
        }

      });
    }
    return textNodes;
  }

  protected hasChildren(elem: Node) {
    return (
      elem.nodeType === Node.ELEMENT_NODE
      || elem.nodeType === Node.DOCUMENT_NODE
      || elem.nodeType === Node.DOCUMENT_FRAGMENT_NODE);
  }

  private prepareImg(img: HTMLImageElement, url: URL) {
    const src = new URL(img.src);
    src.protocol = url.protocol;
    src.hostname = url.hostname;
    img.src = src.toString();
  }

  private prepareLink(link: HTMLAnchorElement, url: URL) {
    link.protocol = url.protocol;
    link.hostname = url.hostname;
  }
}
