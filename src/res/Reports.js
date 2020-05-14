const jsPDF = require('jspdf');
const { applyPlugin } = require('jspdf-autotable');
applyPlugin(jsPDF);

class Reports {
  constructor() {
    this.doc = null;
    this.logobase64 = "data:image/png;base64,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";
  }

  createDoc() {
    this.doc = new jsPDF();
  }

  header() {
    this.doc.setFont("helvetica");
    this.doc.addImage(this.logobase64, 'PNG', 10, 10, 15, 15, '', 'NONE', 0);
    this.doc.setFontType('bold');
    this.doc.setFontSize(14);
    this.doc.text('SalesPoint\nCompany', 30, 18);
    this.doc.setFontType('normal');
    this.doc.setFontSize(10);
    this.doc.text((new Date()).toLocaleString(), 160, 18);
  }

  write(name, content) {
    this.createDoc();
    this.header();
    this.doc.autoTable({
      styles: { cellWidth: 'auto' },
      margin: { top: 60 },
      head: [content[0]],
      body: content[1]
    });
    this.doc.save(name);
  }

  writeFormatOff(name, content) {
    this.createDoc();
    this.header();
    this.doc.setFontType('bold');
    this.doc.setFontSize(12);
    this.doc.text(content[0], 30, 78);
    this.doc.setFontType('normal');
    this.doc.setFontSize(10);
    this.doc.text(content[1], 30, 90);
    this.doc.text(content[2], 30, 95);
    this.doc.text(content[3], 160, 90);
    this.doc.text(content[4], 30, 115);
    this.doc.text(content[5], 30, 100);
    this.doc.save(name);
  }

  writeFormatOffPages(name, content, time, type) {
    this.createDoc();
    let total = 0;

    switch(parseInt(type)) {
      case 0:
      case 1:
        total = this.makeTotalsPage(content);
        this.setPriceHeader(total, content[0], time, type);
        break;
    }

    for(let i = 0; i < content.length; i++) {
      this.header();
      this.doc.setFontType('bold');
      this.doc.text('REPORTE DE ' + ((parseInt(type) == 0) ? 'COMPRAS' : 'VENTAS'), 30, 60);
      this.doc.setFontType('normal');
      this.doc.text('Responsable: ' + content[i].responsable, 30, 70);
      this.doc.text('Estado: ' + ((content[i].state == 0) ? 'Completado' : 'Parcial'), 30, 75);
      this.doc.text('Fecha: ' + content[i].time, 30, 80);
      this.doc.text(content[i].details, 30, 85);
      this.doc.addPage();
    }

    this.doc.save(name);
  }

  makeTotalsPage(content) {
    let total = 0;

    for(let i = 0; i < content.length; i++) {
      let sections = content[i].details.split('\n');
      let index = 0;

      for(let j = 0; j < sections.length; j++) {
        if(sections[j].indexOf('Total') != -1) {
          index = j;
          break;
        }
      }

      const numerical = sections[index].replace('Total: ', '');
      total += parseFloat(numerical);
    }

    return total;
  }

  setPriceHeader(total, content, time, type) {
    const operations = (parseInt(type) == 0) ? 'compras' : 'ventas';
    let header = 'Reporte detallado de ' + operations + ' desde la fecha ' +
      ((time[0] == null || time[0] == '') ? 'de inicio ' : time[0]) + ' a la fecha ' +
      ((time[1] == null || time[1] == '') ? 'actual' : time[1]) + ' de la empresa ' +
      content.company + '.';

    this.doc.setFontSize(10);
    this.doc.text(header, 30, 40);
    this.doc.setFontType('bold');
    this.doc.text('Total: $' + total, 30, 45);
  }
}

module.exports = Reports;
