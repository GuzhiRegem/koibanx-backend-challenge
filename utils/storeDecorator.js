function StoreDecorator (store) {
  this.ID = store._id;
  this.Comercio = store.name;
  this.CUIT = store.cuit;
  this.Conceptos = store.concepts;
  this['Balance actual'] = new Intl.NumberFormat('en', { style: 'currency', currency: 'USD' }).format(store.currentBalance);
  this.Activo = store.active ? 'Sí' : 'No';
  this['Última venta'] = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' }).format(store.lastSale);
}

module.exports = StoreDecorator;
