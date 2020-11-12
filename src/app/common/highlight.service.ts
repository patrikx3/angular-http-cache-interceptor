import { Injectable } from '@angular/core';

import hljs from 'highlight.js/lib/core';
import typescript from 'highlight.js/lib/languages/typescript';
hljs.registerLanguage('typescript', typescript);

@Injectable({
  providedIn: 'root'
})
export class HighlightService {

  constructor() { }

  get hljs() {
    return hljs
  }
}
