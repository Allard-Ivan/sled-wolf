import { Component, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngx-modal',
  templateUrl: './modal.component.html',
})
export class ModalComponent {

  modalHeader: string;
  modalContent = `Shut up.`;

  constructor(private activeModal: NgbActiveModal) { }

  closeModal() {
    this.activeModal.close();
  }

  determine() {
  }
}
