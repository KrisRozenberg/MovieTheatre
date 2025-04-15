import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Ticket } from '../../../core/models/movie.model';
import { MatButton } from '@angular/material/button';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-booking',
  imports: [MatButton, MatDialogModule, NgClass],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookingComponent implements OnInit {
  tickets: Ticket[] = [];
  rows: number[] = [1, 2, 3];
  seats: number[] = [1, 2, 3, 4, 5];

  constructor(
    private _dialogRef: MatDialogRef<BookingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { bookedTickets: Ticket[] }
  ) {}

  ngOnInit(): void {
    if (this.data.bookedTickets) {
      this.tickets = this.data.bookedTickets;
    }
  }

  selectTicket(ticket: Ticket): void {
    this.tickets.push(ticket);
  }

  unselectTicket(ticketToUnselect: Ticket): void {
    this.tickets = this.tickets.filter((ticket) => ticket.row !== ticketToUnselect.row || ticket.seat !== ticketToUnselect.seat);
  }

  isTicketSelected(ticketToCheck: Ticket): boolean {
    return !!this.tickets.find((ticket) => ticket.row === ticketToCheck.row && ticket.seat === ticketToCheck.seat);
  }

  bookTickets(): void {
    this.tickets.sort((ticketA, ticketB) => (
      ticketA.row - ticketB.row === 0
        ? ticketA.seat - ticketB.seat
        : ticketA.row - ticketB.row
    ));

    this._dialogRef.close(this.tickets);
  }
}
