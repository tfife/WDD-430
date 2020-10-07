import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {

  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  documents: Document[] = [
    new Document('1', 'Doc #1 Name', 'This is a detailed description.', 'url.fake.com', []),
    new Document('2', 'The Second Great Document ', 'This is a super great description.', 'url.fake22.com', []),
    new Document('3', 'Really Important Stuff', 'Really, really important description.', 'url.fake333.com', []),
    new Document('4', 'Somewhat Important Stuff', 'This one is not that important.', 'url.fake4444.com', []),
    new Document('5', 'Assignment Details', 'How to do the assignment.', 'url.5f5a5k5e5.com', [])
  ];
  
  constructor() { }

  ngOnInit(): void {
  }

  onSelectedDocument(document:Document) {
    this.selectedDocumentEvent.emit(document);
  }

}
