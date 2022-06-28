import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { fabric } from 'fabric';
declare var $: any;
declare var document: any;
@Component({
  selector: 'ocs-document-preview',
  templateUrl: './document-preview.component.html',
})
export class DocumentPreviewComponent implements AfterViewInit {
  canvas: any;
  canvasOriginalWidth = 1920;
  canvasOriginalHeight = 2717;
  canvasWidth = 600;
  canvasHeight = 800;
  imgWidth: any;
  imgHeight: any;
  bgImage: any;
  canvasScale = 1;
  photoUrlLandscape = 'assets/img/documents/Scan-to-File-2205170845197968.jpg';

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.zoomOut(2.25);
    }, 200);
  }
  extended: boolean = false;
  @Output() documentToggled: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  @Output() textSelected: EventEmitter<string> = new EventEmitter<string>();
  toggleDocument() {
    this.extended = !this.extended;
    this.documentToggled.emit(this.extended);
  }

  setCanvas() {
    this.canvas = new fabric.Canvas('canvas');
    this.canvas.hoverCursor = 'pointer';
    this.setCanvasSize({ height: this.canvasHeight, width: this.canvasWidth });
    this.setCanvasBackgroundImageUrl(this.photoUrlLandscape);
  }

  zoom(delta) {
    var zoom = this.canvas.getZoom();
    zoom *= 0.999 ** delta;
    if (zoom > 20) zoom = 20;
    if (zoom < 0.01) zoom = 0.01;
    const height = this.canvasHeight * zoom;
    const width = this.canvasWidth * zoom;
    debugger;
    this.canvas.setHeight(height);
    this.canvas.setWidth(width);

    this.canvas.setZoom(zoom);
  }
  zoomOut(scale) {
    this.canvasScale /= scale;

    this.setCanvas();
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
        obj.selected.forEach((element) => {
          text += ' ' + element.id;
        });
        that.textSelected.emit(text);
      },
      'selection:updated': this.HandleElement.bind(this),
    });

    this.canvas.renderAll();
  }
  HandleElement(obj) {
    debugger;
    var text = '';
    obj.selected.forEach((element) => {
      text += ' ' + element.id;
    });
    this.textSelected.emit(text);
  }
  setBloks() {
    var pageHeight = this.canvas.getHeight();
    var pageWidth = this.canvas.getWidth();
    this.canvas.setDimensions({ height: pageHeight, width: pageWidth });
    for (var i = 0; i < this.blocks.length; i++) {
      var block = this.blocks[i];
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

  blocks: any[] = [
    {
      text: 'windream.',
      left: 0.69342476805163378,
      top: 0.023090079817559863,
      width: 0.19120613150463897,
      height: 0.0330672748004561,
    },
    {
      text: 'WINDREAM',
      left: 0.12666397741024607,
      top: 0.16362599771949829,
      width: 0.063735377168213,
      height: 0.0054161915621436718,
    },
    {
      text: 'GMBH',
      left: 0.19564340459862847,
      top: 0.16334093500570127,
      width: 0.0326744655102864,
      height: 0.0057012542759407071,
    },
    {
      text: 'q',
      left: 0.236385639370714,
      top: 0.16619156214367162,
      width: 0.0036304961678096008,
      height: 0.0028506271379703536,
    },
    {
      text: 'WASSERSTRASSE',
      left: 0.24647035094796288,
      top: 0.16334093500570127,
      width: 0.097620008067769257,
      height: 0.0059863169897377425,
    },
    {
      text: '219',
      left: 0.34973779749899153,
      top: 0.16334093500570127,
      width: 0.019362646228317869,
      height: 0.0057012542759407071,
    },
    {
      text: '0',
      left: 0.37757160145219848,
      top: 0.16619156214367162,
      width: 0.0036304961678096008,
      height: 0.0028506271379703536,
    },
    {
      text: '44799',
      left: 0.3872529245663574,
      top: 0.16334093500570127,
      width: 0.034691407825736181,
      height: 0.0057012542759407071,
    },
    {
      text: 'BOCHUM',
      left: 0.42718838241226303,
      top: 0.16334093500570127,
      width: 0.047599838644614763,
      height: 0.0059863169897377425,
    },
    {
      text: 'Lieferschein',
      left: 0.64461476401774909,
      top: 0.19498289623717219,
      width: 0.10407422347720856,
      height: 0.0099771949828962366,
    },
    {
      text: 'Kunden-Nr.:',
      left: 0.14320290439693426,
      top: 0.36488027366020526,
      width: 0.096409842678499391,
      height: 0.0065564424173318132,
    },
    {
      text: '4711',
      left: 0.31101250504235578,
      top: 0.36488027366020526,
      width: 0.033077853973376363,
      height: 0.0065564424173318132,
    },
    {
      text: 'Pos',
      left: 0.15328761597418314,
      top: 0.43443557582668185,
      width: 0.02581686163775716,
      height: 0.0091220068415051314,
    },
    {
      text: 'Leistung',
      left: 0.19645018152480839,
      top: 0.43443557582668185,
      width: 0.0645421540943929,
      height: 0.011402508551881414,
    },
    {
      text: 'Menge',
      left: 0.81363453005244046,
      top: 0.43443557582668185,
      width: 0.056070996369503835,
      height: 0.011402508551881414,
    },
    {
      text: '50',
      left: 0.83743444937474787,
      top: 0.4603762827822121,
      width: 0.016135538523598225,
      height: 0.00798175598631699,
    },
    {
      text: '50',
      left: 0.83743444937474787,
      top: 0.49287343215507412,
      width: 0.016135538523598225,
      height: 0.00798175598631699,
    },
    {
      text: '1',
      left: 0.84751916095199675,
      top: 0.52565564424173317,
      width: 0.0032271077047196449,
      height: 0.00798175598631699,
    },
    {
      text: '1',
      left: 0.84751916095199675,
      top: 0.55815279361459524,
      width: 0.0032271077047196449,
      height: 0.00798175598631699,
    },
    {
      text: '50',
      left: 0.83743444937474787,
      top: 0.59064994298745721,
      width: 0.016135538523598225,
      height: 0.00798175598631699,
    },
    {
      text: '50',
      left: 0.83743444937474787,
      top: 0.61060433295324967,
      width: 0.016135538523598225,
      height: 0.00798175598631699,
    },
    {
      text: '1',
      left: 0.84751916095199675,
      top: 0.63055872291904214,
      width: 0.0032271077047196449,
      height: 0.00798175598631699,
    },
    {
      text: '1',
      left: 0.84751916095199675,
      top: 0.65051311288483471,
      width: 0.0032271077047196449,
      height: 0.00798175598631699,
    },
    {
      text: 'Nummer:',
      left: 0.64461476401774909,
      top: 0.21408209806157355,
      width: 0.0645421540943929,
      height: 0.00798175598631699,
    },
    {
      text: 'Datum:',
      left: 0.64461476401774909,
      top: 0.23061573546180159,
      width: 0.051633723275514319,
      height: 0.00798175598631699,
    },
    {
      text: 'L20114711',
      left: 0.8083904800322711,
      top: 0.21408209806157355,
      width: 0.069786204114562322,
      height: 0.00798175598631699,
    },
    {
      text: '12.05.2011',
      left: 0.80798709156918114,
      top: 0.23061573546180159,
      width: 0.070189592577652282,
      height: 0.00798175598631699,
    },
    {
      text: '10000207991',
      left: 0.79104477611940294,
      top: 0.24743443557582667,
      width: 0.087131908027430413,
      height: 0.00798175598631699,
    },
    {
      text: '2011-05-02',
      left: 0.80475998386446146,
      top: 0.26396807297605474,
      width: 0.075837031060911664,
      height: 0.00798175598631699,
    },
    {
      text: 'Es',
      left: 0.14400968132311415,
      top: 0.74030786773090085,
      width: 0.012505042355788625,
      height: 0.00798175598631699,
    },
    {
      text: 'gelten',
      left: 0.16135538523598225,
      top: 0.74030786773090085,
      width: 0.045986284792254944,
      height: 0.010262257696693273,
    },
    {
      text: 'unsere',
      left: 0.21339249697458654,
      top: 0.742018244013683,
      width: 0.04719645018152481,
      height: 0.0062713797035347778,
    },
    {
      text: 'Allgemeinen',
      left: 0.26502622025010086,
      top: 0.74030786773090085,
      width: 0.091569181121419929,
      height: 0.010262257696693273,
    },
    {
      text: 'Geschdftsbedingungen,',
      left: 0.36264622831787013,
      top: 0.74030786773090085,
      width: 0.17749092375958048,
      height: 0.010262257696693273,
    },
    {
      text: 'sofern',
      left: 0.54376764824526014,
      top: 0.74030786773090085,
      width: 0.043162565550625254,
      height: 0.00798175598631699,
    },
    {
      text: 'nichts',
      left: 0.59257765227914483,
      top: 0.74030786773090085,
      width: 0.041145623235175476,
      height: 0.00798175598631699,
    },
    {
      text: 'anderes',
      left: 0.6385639370713998,
      top: 0.74030786773090085,
      width: 0.059298104074223479,
      height: 0.00798175598631699,
    },
    {
      text: 'vereinbart',
      left: 0.70189592577652282,
      top: 0.74030786773090085,
      width: 0.075030254134731744,
      height: 0.00798175598631699,
    },
    {
      text: 'ist.',
      left: 0.78217022993142393,
      top: 0.74030786773090085,
      width: 0.015732150060508269,
      height: 0.00798175598631699,
    },
    {
      text: 'Unsere',
      left: 0.14400968132311415,
      top: 0.75456100342075261,
      width: 0.047599838644614763,
      height: 0.00798175598631699,
    },
    {
      text: 'Allgemeinen',
      left: 0.19604679306171843,
      top: 0.75456100342075261,
      width: 0.091972569584509889,
      height: 0.010262257696693273,
    },
    {
      text: 'Geschdftsbedingungen',
      left: 0.29366680112948768,
      top: 0.75456100342075261,
      width: 0.17265026220250102,
      height: 0.010262257696693273,
    },
    {
      text: 'linden',
      left: 0.47196450181524807,
      top: 0.75456100342075261,
      width: 0.044776119402985072,
      height: 0.00798175598631699,
    },
    {
      text: 'Sie',
      left: 0.52198467123840253,
      top: 0.75456100342075261,
      width: 0.019362646228317869,
      height: 0.00798175598631699,
    },
    {
      text: 'unter:',
      left: 0.54699475594997982,
      top: 0.75456100342075261,
      width: 0.040338846308995563,
      height: 0.00798175598631699,
    },
    {
      text: 'http://www.windream.com/pdfs/agbs.pdf',
      left: 0.14360629286002422,
      top: 0.76881413911060437,
      width: 0.31020572811617586,
      height: 0.0094070695553021659,
    },
    {
      text: 'One',
      left: 0.14360629286002422,
      top: 0.19897377423033066,
      width: 0.031060911657926585,
      height: 0.00798175598631699,
    },
    {
      text: 'Click',
      left: 0.18031464300121017,
      top: 0.19897377423033066,
      width: 0.034288019362646228,
      height: 0.00798175598631699,
    },
    {
      text: 'Solutions',
      left: 0.21944332392093585,
      top: 0.19897377423033066,
      width: 0.06212182331585317,
      height: 0.00798175598631699,
    },
    {
      text: 'GmbH',
      left: 0.28680919725695847,
      top: 0.19897377423033066,
      width: 0.045986284792254944,
      height: 0.00798175598631699,
    },
    {
      text: 'Klaus',
      left: 0.14400968132311415,
      top: 0.21550741163055873,
      width: 0.035901573215006054,
      height: 0.00798175598631699,
    },
    {
      text: 'Rehm',
      left: 0.18555869302137959,
      top: 0.21550741163055873,
      width: 0.040742234772085516,
      height: 0.00798175598631699,
    },
    {
      text: 'Zwergbachstraße',
      left: 0.14320290439693426,
      top: 0.23204104903078676,
      width: 0.12666397741024607,
      height: 0.010262257696693273,
    },
    {
      text: '16',
      left: 0.27672448567970959,
      top: 0.23204104903078676,
      width: 0.014118596208148447,
      height: 0.00798175598631699,
    },
    {
      text: '89428',
      left: 0.14320290439693426,
      top: 0.24857468643101482,
      width: 0.041549011698265428,
      height: 0.00798175598631699,
    },
    {
      text: 'Syrgenstein',
      left: 0.18999596611536909,
      top: 0.24857468643101482,
      width: 0.082291246470350951,
      height: 0.010547320410490307,
    },
    {
      text: 'Ihre',
      left: 0.64461476401774909,
      top: 0.24743443557582667,
      width: 0.025413473174667203,
      height: 0.00798175598631699,
    },
    {
      text: 'Bestellung:',
      left: 0.67607906413876562,
      top: 0.24743443557582667,
      width: 0.0754336425978217,
      height: 0.010262257696693273,
    },
    {
      text: 'vom:',
      left: 0.64340459862847921,
      top: 0.26596351197263396,
      width: 0.034691407825736181,
      height: 0.0059863169897377425,
    },
    {
      text: 'Bitte',
      left: 0.14400968132311415,
      top: 0.790193842645382,
      width: 0.030254134731746672,
      height: 0.00798175598631699,
    },
    {
      text: 'informieren',
      left: 0.17950786607503025,
      top: 0.790193842645382,
      width: 0.080677692617991126,
      height: 0.00798175598631699,
    },
    {
      text: 'Sie',
      left: 0.26542960871319082,
      top: 0.790193842645382,
      width: 0.019362646228317869,
      height: 0.00798175598631699,
    },
    {
      text: 'uns',
      left: 0.29043969342476805,
      top: 0.79218928164196123,
      width: 0.023396530859217425,
      height: 0.0059863169897377425,
    },
    {
      text: 'uber',
      left: 0.31908027430415492,
      top: 0.790193842645382,
      width: 0.0326744655102864,
      height: 0.00798175598631699,
    },
    {
      text: 'eventuelle',
      left: 0.35699878983461075,
      top: 0.790193842645382,
      width: 0.0754336425978217,
      height: 0.00798175598631699,
    },
    {
      text: 'Abweichungen',
      left: 0.43686970552642196,
      top: 0.790193842645382,
      width: 0.11254538120209762,
      height: 0.010262257696693273,
    },
    {
      text: 'Ihrer',
      left: 0.55546591367486886,
      top: 0.790193842645382,
      width: 0.030254134731746672,
      height: 0.00798175598631699,
    },
    {
      text: 'Lieferung',
      left: 0.591367486889875,
      top: 0.790193842645382,
      width: 0.065752319483662766,
      height: 0.010262257696693273,
    },
    {
      text: 'schriftlich',
      left: 0.6623638563937071,
      top: 0.790193842645382,
      width: 0.066559096409842672,
      height: 0.00798175598631699,
    },
    {
      text: 'innerhalb',
      left: 0.14360629286002422,
      top: 0.80444697833523371,
      width: 0.067769261799112551,
      height: 0.00798175598631699,
    },
    {
      text: 'von',
      left: 0.21581282775312627,
      top: 0.806442417331813,
      width: 0.026623638563937072,
      height: 0.0059863169897377425,
    },
    {
      text: '7',
      left: 0.24808390480032272,
      top: 0.80444697833523371,
      width: 0.00645421540943929,
      height: 0.00798175598631699,
    },
    {
      text: 'Tagen.',
      left: 0.25937878176684148,
      top: 0.80444697833523371,
      width: 0.047599838644614763,
      height: 0.010262257696693273,
    },
    {
      text: 'Ansprechpartner:',
      left: 0.1427995159338443,
      top: 0.38141391106043332,
      width: 0.14199273900766438,
      height: 0.00855188141391106,
    },
    {
      text: 'Michael',
      left: 0.30939895118999594,
      top: 0.38141391106043332,
      width: 0.06212182331585317,
      height: 0.0065564424173318132,
    },
    {
      text: 'Pruin',
      left: 0.38241226300927794,
      top: 0.38141391106043332,
      width: 0.043969342476805166,
      height: 0.0065564424173318132,
    },
    {
      text: '5',
      left: 0.16175877369907221,
      top: 0.59064994298745721,
      width: 0.0076643807987091571,
      height: 0.00798175598631699,
    },
    {
      text: 'Windream',
      left: 0.19524001613553851,
      top: 0.59064994298745721,
      width: 0.0754336425978217,
      height: 0.00798175598631699,
    },
    {
      text: 'DocView,',
      left: 0.27672448567970959,
      top: 0.59064994298745721,
      width: 0.069786204114562322,
      height: 0.0088369441277080952,
    },
    {
      text: 'deutsch',
      left: 0.35175473981444133,
      top: 0.59064994298745721,
      width: 0.057684550221863654,
      height: 0.00798175598631699,
    },
    {
      text: '6',
      left: 0.16175877369907221,
      top: 0.61060433295324967,
      width: 0.0076643807987091571,
      height: 0.00798175598631699,
    },
    {
      text: 'Windream',
      left: 0.19524001613553851,
      top: 0.61060433295324967,
      width: 0.0754336425978217,
      height: 0.00798175598631699,
    },
    {
      text: 'Exchange',
      left: 0.27672448567970959,
      top: 0.61060433295324967,
      width: 0.072206534893102053,
      height: 0.010262257696693273,
    },
    {
      text: '2',
      left: 0.16175877369907221,
      top: 0.49287343215507412,
      width: 0.0072609923356192017,
      height: 0.00798175598631699,
    },
    {
      text: 'Windream',
      left: 0.19524001613553851,
      top: 0.49287343215507412,
      width: 0.0754336425978217,
      height: 0.00798175598631699,
    },
    {
      text: 'Standard',
      left: 0.27591770875352967,
      top: 0.49287343215507412,
      width: 0.066155707946752726,
      height: 0.00798175598631699,
    },
    {
      text: 'Business',
      left: 0.34852763210972165,
      top: 0.49287343215507412,
      width: 0.056474384832593788,
      height: 0.00798175598631699,
    },
    {
      text: 'Extension',
      left: 0.41064945542557485,
      top: 0.49287343215507412,
      width: 0.0653489310205728,
      height: 0.00798175598631699,
    },
    {
      text: 'SBX;',
      left: 0.19564340459862847,
      top: 0.5057012542759407,
      width: 0.028237192416296894,
      height: 0.0088369441277080952,
    },
    {
      text: 'dt.',
      left: 0.22952803549818476,
      top: 0.5057012542759407,
      width: 0.017749092375958047,
      height: 0.00798175598631699,
    },
    {
      text: '8',
      left: 0.16175877369907221,
      top: 0.65051311288483471,
      width: 0.0072609923356192017,
      height: 0.00798175598631699,
    },
    {
      text: 'Mediapack',
      left: 0.19645018152480839,
      top: 0.65051311288483471,
      width: 0.083904800322710776,
      height: 0.0099771949828962366,
    },
    {
      text: 'Windream',
      left: 0.28519564340459863,
      top: 0.65051311288483471,
      width: 0.075030254134731744,
      height: 0.00798175598631699,
    },
    {
      text: '4',
      left: 0.16135538523598225,
      top: 0.55815279361459524,
      width: 0.0076643807987091571,
      height: 0.00798175598631699,
    },
    {
      text: 'Windream',
      left: 0.19524001613553851,
      top: 0.55815279361459524,
      width: 0.0754336425978217,
      height: 0.00798175598631699,
    },
    {
      text: 'Management',
      left: 0.27672448567970959,
      top: 0.55815279361459524,
      width: 0.10084711577248891,
      height: 0.010262257696693273,
    },
    {
      text: 'Extension',
      left: 0.38321903993545786,
      top: 0.55815279361459524,
      width: 0.0653489310205728,
      height: 0.00798175598631699,
    },
    {
      text: 'WMX;',
      left: 0.19524001613553851,
      top: 0.57069555302166475,
      width: 0.041145623235175476,
      height: 0.0088369441277080952,
    },
    {
      text: 'deutsch',
      left: 0.24203307785397338,
      top: 0.57069555302166475,
      width: 0.058087938684953613,
      height: 0.00798175598631699,
    },
    {
      text: '7',
      left: 0.16216216216216217,
      top: 0.63055872291904214,
      width: 0.00645421540943929,
      height: 0.00798175598631699,
    },
    {
      text: 'Microsoft',
      left: 0.19645018152480839,
      top: 0.63055872291904214,
      width: 0.065752319483662766,
      height: 0.00798175598631699,
    },
    {
      text: 'SQL-Server',
      left: 0.26704316256555061,
      top: 0.63055872291904214,
      width: 0.07664380798709157,
      height: 0.00798175598631699,
    },
    {
      text: '2005',
      left: 0.34852763210972165,
      top: 0.63055872291904214,
      width: 0.0326744655102864,
      height: 0.00798175598631699,
    },
    {
      text: 'Standard',
      left: 0.38644614764017748,
      top: 0.63055872291904214,
      width: 0.065752319483662766,
      height: 0.00798175598631699,
    },
    {
      text: '3',
      left: 0.16175877369907221,
      top: 0.52565564424173317,
      width: 0.0072609923356192017,
      height: 0.00798175598631699,
    },
    {
      text: 'Windream',
      left: 0.19524001613553851,
      top: 0.52565564424173317,
      width: 0.0754336425978217,
      height: 0.00798175598631699,
    },
    {
      text: 'Management',
      left: 0.27672448567970959,
      top: 0.52565564424173317,
      width: 0.10084711577248891,
      height: 0.010262257696693273,
    },
    {
      text: 'Console',
      left: 0.3828156514723679,
      top: 0.52565564424173317,
      width: 0.058491327148043566,
      height: 0.00798175598631699,
    },
    {
      text: 'WMC;',
      left: 0.19524001613553851,
      top: 0.53819840364880278,
      width: 0.044372730939895119,
      height: 0.0088369441277080952,
    },
    {
      text: 'dt.',
      left: 0.24526018555869303,
      top: 0.53819840364880278,
      width: 0.017749092375958047,
      height: 0.00798175598631699,
    },
    {
      text: '1',
      left: 0.16337232755143202,
      top: 0.4603762827822121,
      width: 0.0032271077047196449,
      height: 0.00798175598631699,
    },
    {
      text: 'Windream',
      left: 0.19524001613553851,
      top: 0.4603762827822121,
      width: 0.0754336425978217,
      height: 0.00798175598631699,
    },
    {
      text: 'Standard',
      left: 0.27591770875352967,
      top: 0.4603762827822121,
      width: 0.066155707946752726,
      height: 0.00798175598631699,
    },
    {
      text: 'Business',
      left: 0.34852763210972165,
      top: 0.4603762827822121,
      width: 0.056474384832593788,
      height: 0.00798175598631699,
    },
    {
      text: 'Edition',
      left: 0.41064945542557485,
      top: 0.4603762827822121,
      width: 0.0463896732553449,
      height: 0.00798175598631699,
    },
    {
      text: 'SBE;',
      left: 0.19564340459862847,
      top: 0.47291904218928166,
      width: 0.027430415490116981,
      height: 0.0088369441277080952,
    },
    {
      text: 'dt.',
      left: 0.22831787010891488,
      top: 0.47291904218928166,
      width: 0.017749092375958047,
      height: 0.00798175598631699,
    },
  ];
}
