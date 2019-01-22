import {
  ComponentRef,
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';
import { filter, takeUntil } from 'rxjs/operators';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { merge } from 'rxjs/observable/merge';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { NgbPopoverWindow } from '@ng-bootstrap/ng-bootstrap/popover/popover';
import { Subject } from 'rxjs/Subject';

@Directive({
  selector: '[appHandlePopoverClose][ngbPopover]'
})
export class HandlePopoverCloseDirective implements OnInit, OnDestroy {

  @Input('handlePopoverClose') closeOnPopoverBodyClick = false;

  private destroy$ = new Subject<void>();

  constructor(
      private elementRef: ElementRef,
      private ngbPopover: NgbPopover) {
  }

  ngOnInit() {
    const closedOrDestroyed$ = merge(this.ngbPopover.hidden, this.destroy$);
    const events$ = merge(
        fromEvent(document, 'click'),
        fromEvent(document, 'keydown').pipe(filter((event: KeyboardEvent) => event.keyCode === 27)) // esc
    );

    this.ngbPopover.shown.subscribe(() => {
      events$
          .pipe(takeUntil(closedOrDestroyed$))
          .subscribe((event: MouseEvent) => this.handleCloseEvents(event));
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private handleCloseEvents(event: MouseEvent): void {
    if (event.type === 'keydown') {
      this.ngbPopover.close();
      return;
    }

    const target = event.target as Element;
    if (!this.elementRef.nativeElement.contains(target)) {
      const popoverWindowRef: ComponentRef<NgbPopoverWindow> = (this.ngbPopover as any)._windowRef;
      if (!popoverWindowRef.location.nativeElement.contains(event.target) || this.closeOnPopoverBodyClick) {
        this.ngbPopover.close();
      }
    }
  }

}
