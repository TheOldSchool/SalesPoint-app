<template lang="html">
  <div class="container" id="market-car">
    <ul class="list-group list-group-flush">
      <li class="list-group-item">
        <h5><b>Carrito</b></h5>
      </li>
      <li class="list-group-item">
        <small>Lista #1 <i>hace 1 hora</i></small>
      </li>
      <li class="list-group-item">

      </li>
    </ul>

    <table>
      <tr>
        <td><span>Subtotal</span></td>
        <td class="text-right">56</td>
      </tr>
      <tr>
        <td><span>Descuento</span></td>
        <td class="text-right">$0.00</td>
      </tr>
      <tr>
        <td><b><span>Total</span></b></td>
        <td class="text-right"><b><span>$190.00</span></b></td>
      </tr>
      <tr>
        <td>
          <button class="btn btn-secondary">
            Ticket
          </button>
        </td>
        <td>
          <button class="btn btn-primary">
            Cobrar
          </button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'MarketCar'
}
</script>

<style lang="css" scoped>
h5 {
  padding-top: 10px;
}

table {
  bottom: 0;
  width: 100%;
} table tr td {
  width: 50%;
} .btn-primary {
  width: 100%;
}
</style>
