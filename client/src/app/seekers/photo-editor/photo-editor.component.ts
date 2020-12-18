import { Component, Input, OnInit } from '@angular/core';
import { Seeker } from 'src/app/_models/seeker';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  @Input() seeker: Seeker;

  constructor() { }

  ngOnInit(): void {
  }

}
