import {CommonModule} from '@angular/common';
import {Component, ElementRef, Inject, NgModule, OnInit, ViewChild} from '@angular/core';
import {FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ISourceParseService} from '@app-services/source-parse.service';
import {SOURFCE_PARSE_SERVICE, TRANSLATE_SERVICE} from '@app/services/injection-tokens';
import {ITranslateService} from '@app/services/translate.service';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {ButtonModule} from 'primeng/button';
import {EditorModule} from 'primeng/editor';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {ToolbarModule} from 'primeng/toolbar';

import {DATA_SERVICE, IDataService} from '@app-services/data';
import {ISourceEntityTranslate} from '@app/types';
import * as Immutable from 'immutable';
import {TransNewInsertHTMLModule} from '../dialog/insert-html/insert-html-dialog.component';
import {IFormService} from '@app-library/components/form/types';
import {FORM_SERVICE} from '@app-library/components/form/form.service';
import {ActivatedRoute} from '@angular/router';
import {switchMap} from 'rxjs/internal/operators/switchMap';
import {TabViewModule} from 'primeng/tabview';
import {TabSourceModule} from '@pages/translate/source/translate/form/tabs/tab-source.component';
import {withLatestFrom} from 'rxjs/operators';
import {ISourceConfig} from '@app-library/app-config';

@Component({
  selector: 'translate-form',
  templateUrl: 'translate-form.component.html'
})
export class TranslateFormComponent implements OnInit {
  public pageTitle = 'New source';
  public content = '';
  public editor = ClassicEditor;
  @ViewChild('source') source: ElementRef;
  public displayInsertDialog = false;
  public entity: Immutable.RecordOf<ISourceEntityTranslate>;
  public form: FormGroup;

  constructor(
    @Inject(FORM_SERVICE) private formService: IFormService,
    @Inject(TRANSLATE_SERVICE) protected service: ITranslateService,
    @Inject(SOURFCE_PARSE_SERVICE) protected parser: ISourceParseService,
    @Inject(DATA_SERVICE) private data: IDataService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {

    this.formService.getId(this.route).pipe(
      withLatestFrom(
        this.formService.getSource('translate'),
        (id: string, config: ISourceConfig<ISourceEntityTranslate>) => ({id, config})),
      switchMap(({id, config}) => {
        this.form = this.formService.createForm();
        this.formService.addControls(this.form, config.fields);
        return this.formService.getEntity<ISourceEntityTranslate>(config, id);
      }),
    ).subscribe((entity: Immutable.RecordOf<ISourceEntityTranslate>) => {
      this.entity = entity;
      this.form.setValue(entity);
    });


  }


  insertHTML() {
    this.displayInsertDialog = true;
  }

  // createTranslate() {
  //
  //
  //   this.entity = this.parser.parse(this.content, this.entity);
  //   this.data.save(this.entity).subscribe((entity: ISourceEntityTranslate) => {
  //     this.entity = createEntity<ISourceEntityTranslate>(entity.source, entity.id, entity);
  //     console.log('[SAVED]', entity);
  //   });
  // }
}

@NgModule({
  declarations: [TranslateFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ToolbarModule,
    ButtonModule,
    TabSourceModule,
    CKEditorModule,
    TabViewModule,
    EditorModule,
    InputTextareaModule,
    InputTextModule,
    TransNewInsertHTMLModule,
  ],
  exports: [TranslateFormComponent]
})
export class TranslateFormModule {
}
