import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { fabric } from 'fabric';
declare var $: any;

@Component({
  selector: 'ocs-document-preview',
  templateUrl: './document-preview.component.html',
})
export class DocumentPreviewComponent implements AfterViewInit {
  @Input('page') page: any;
  canvas: any;
  canvasOriginalWidth;
  canvasOriginalHeight;
  canvasWidth = 600;
  canvasHeight = 800;
  imgWidth: any;
  imgHeight: any;
  bgImage: any;
  canvasScale = 1;

  ngAfterViewInit(): void {
    debugger;
    var wrapper = $('#convas-wrapper' + this.documentId);
    wrapper.empty().append('<canvas id="canvas' + this.page.id + '"></canvas>');
  }
  extended: boolean = false;
  @Output() documentToggled: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  @Output() textSelected: EventEmitter<string> = new EventEmitter<string>();
  @Input('documentId') documentId: string;
  toggleDocument() {
    this.extended = !this.extended;
    this.documentToggled.emit(this.extended);
  }

  setCanvas(id) {
    let that = this;
    that.canvas = undefined;
    that.canvas = new fabric.Canvas('canvas' + id);
    fabric.Group.prototype.hasControls = false;
    fabric.Group.prototype.lockMovementY = true;
    fabric.Group.prototype.lockMovementX = true;
    this.canvas.hoverCursor = 'pointer';
    var documentImage = new Image();
    documentImage.src = 'assets/img/documents/' + that.page.id + '.jpg';
    documentImage.onload = function () {
      that.canvasOriginalWidth = documentImage.naturalWidth;
      that.canvasOriginalHeight = documentImage.naturalHeight;
      that.canvasWidth = 600;
      that.canvasHeight = 800;

      that.setCanvasSize({
        height: that.canvasHeight,
        width: that.canvasWidth,
      });
      that.setCanvasBackgroundImageUrl(documentImage.src);
    };
  }

  zoom(delta) {
    var zoom = this.canvas.getZoom();
    zoom *= 0.999 ** delta;
    if (zoom > 20) zoom = 20;
    if (zoom < 0.01) zoom = 0.01;
    const height = this.canvasHeight * zoom;
    const width = this.canvasWidth * zoom;

    this.canvas.setHeight(height);
    this.canvas.setWidth(width);

    this.canvas.setZoom(zoom);
  }
  zoomOut(scale) {
    this.canvasScale /= scale;
  }
  fitPageHeight() {}
  setCanvasSize(canvasSizeObject) {
    this.canvas.setWidth(canvasSizeObject.width);
    this.canvas.setHeight(canvasSizeObject.height);
  }

  setCanvasBackgroundImageUrl(url) {
    let that = this;
    if (url && url.length > 0) {
      fabric.Image.fromURL(url, function (img) {
        that.bgImage = img;
        that.scaleAndPositionImage();
      });
    } else {
      that.canvas.backgroundImage = 0;
      that.canvas.setBackgroundImage(
        '',
        that.canvas.renderAll.bind(that.canvas)
      );
      that.canvas.renderAll();
    }
  }
  scaleAndPositionImage() {
    let that = this;

    that.canvas.clear();
    this.setCanvasZoom();
    var canvasAspect = this.canvasWidth / this.canvasHeight;
    var imgAspect = this.bgImage.width / this.bgImage.height;
    var left, top, scaleFactor;

    if (canvasAspect >= imgAspect) {
      scaleFactor = this.canvasWidth / this.bgImage.width;
      left = 0;
      top = -(this.bgImage.height * scaleFactor - this.canvasHeight) / 2;
    } else {
      scaleFactor = this.canvasHeight / this.bgImage.height;
      top = 0;
      left = -(this.bgImage.width * scaleFactor - this.canvasWidth) / 2;
    }

    this.canvas.setBackgroundImage(
      this.bgImage,
      this.canvas.renderAll.bind(this.canvas),
      {
        top: top,
        left: left,
        originX: 'left',
        originY: 'top',
        scaleX: scaleFactor,
        scaleY: scaleFactor,
      }
    );
    this.setBloks();
    this.canvas.on({
      'selection:created': (obj) => {
        var text = '';
        this.canvas.getActiveObject().borderScaleFactor = 2;
        if (obj.selected.length > 1) {
          var groupedBloks = this.groupBy(obj.selected, 'top');
          for (const [key, value] of Object.entries(groupedBloks)) {
            var texts = value as Array<any>;
            for (let i = 0; i <= texts.length - 1; i++) {
              text += texts[i].id;
            }
            text += '\\n';
          }
        } else
          obj.selected.forEach((element) => {
            text += ' ' + element.id;
          });

        text = text.replace(/(?:\r\n|\r|\n)/g, '<br>');
        that.textSelected.emit(text);
      },
      'selection:updated': this.HandleElement.bind(this),
    });

    this.canvas.renderAll();
  }
  HandleElement(obj) {
    var text = '';
    obj.selected.forEach((element) => {
      text += ' ' + element.id;
    });
    this.textSelected.emit(text);
  }
  groupBy(xs, key) {
    return xs.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  }
  setBloks() {
    var pageHeight = this.canvas.getHeight();
    var pageWidth = this.canvas.getWidth();
    this.canvas.setDimensions({ height: pageHeight, width: pageWidth });
    for (var i = 0; i < this.page.blocks.length; i++) {
      var block = this.page.blocks[i];
      var blockContent = new fabric.Rect({
        left: block.left * pageWidth,
        top: block.top * pageHeight,
        width: block.width * pageWidth,
        height: block.height * pageHeight,
        fill: 'green',
        opacity: 0.1,
        id: block.text,
        hoverCursor: 'pointer',
        lockMovementY: true,
        lockMovementX: true,
        borderScaleFactor: 2,
      });
      blockContent.controls = {
        ...fabric.Rect.prototype.controls,
      };
      blockContent.setControlsVisibility({
        mt: false,
        mb: false,
        ml: false,
        mr: false,
        bl: false,
        br: false,
        tl: false,
        tr: false,
        mtr: false,
      });
      this.canvas.add(blockContent);
    }
  }
  setCanvasZoom() {
    this.canvasWidth = this.canvasOriginalWidth * this.canvasScale;
    this.canvasHeight = this.canvasOriginalHeight * this.canvasScale;

    this.canvas.setWidth(this.canvasWidth);
    this.canvas.setHeight(this.canvasHeight);
  }

  loadDocument(page, id) {
    debugger;
    this.page = page;
    this.documentId = id;
    if (this.canvas) {
      var wrapper = $('#convas-wrapper' + this.documentId);
      wrapper.empty().append('<canvas id="canvas' + page.id + '"></canvas>');
    }

    this.canvasScale = 1;
    this.setCanvas(page.id);
    this.canvasScale /= 2.5;
  }
}
