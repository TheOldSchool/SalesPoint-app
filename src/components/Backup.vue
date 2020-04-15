<template>
  <div id="backup" class="container">
    <div class="container">
      <div class="row">
        <div class="col">
          <h3><b>Respaldo</b></h3>
        </div>
      </div>
      <div class="row">

        <div class="container content">
          <h6><b>Recuperar</b></h6>
          <div class="row">
            <div class="col">
              <form @submit.prevent="restoreFromFile($event)">
                <div class="form-group">
                  <label for="physic">Respaldo archivo</label>
                  <input id="physic" type="file" name="physic" class="form-control">
                  <input class="btn btn-success btn-block mt-3"
                    type="submit" value="Recuperar">
                </div>
              </form>
            </div>
            <div class="col">
              <label for="virtual">Respaldo en el sistema</label>
              <input id="virtual" type="text" name="virtual" class="form-control" v-model="last" disabled>
              <button class="btn btn-primary btn-block mt-3" id="backup-btn" @click="makeBackup()">
                Respaldar
              </button>
            </div>
          </div>
        </div>

        <div id="backup-area" class="container">
          <div class="spinner-border text-primary" role="status" v-show="loading">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Backup',
  data: function() {
    return {
      last: 'No se ha hecho ningun respaldo',
      loading: false
    }
  },
  methods: {
    getBackups: async function() {
      const route = '/getbackups';
      const params = {
        backup: {
          type: 'backup',
          template: { company: this.$getter.getUser().company }
        }
      };

      const response = await this.$requester.post(route, params);
      return response;
    },
    makeBackup: async function() {
      this.loading = true;
      const route = '/backup';
      const backup = {
        backup: {
          type: 'backup',
          template: {
            key: this.$getter.getRandomKey(),
            company: this.$getter.getUser().company
          }
        }
      };

      const response = await this.$requester.post(route, backup);
      this.downloadBackup(response);
      const backups = await this.getBackups();
      if(backups.length > 0)
        this.last = backups[0].time;
      else
        this.last = 'No se ha hecho ningun respaldo';
      this.loading = false;
    },
    restoreFromFile: function(event) {
      const file = event.target.physic.files[0];
      const reader = new FileReader();
      reader.onload = this.onReaderLoad;
      reader.readAsText(file);
    },
    onReaderLoad: async function(event) {
      let obj = JSON.parse(event.target.result);
      const route = '/restorebackup';
      const types = ['product', 'employee', 'user', 'inventory', 'provider', 'shop', 'historical'];

      for(let i = 0; i < types.length; i++) {
        for(let j = 0; j < obj[types[i]].length; j++) {
          const params = {
            backup: {
              type: types[i],
              template: obj[types[i]][j]
            }
          };

          const response = await this.$requester.post(route, params);
          console.log(response);
        }
      }
    },
    downloadBackup: function(backup) {
      var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backup));
      var downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute("href",     dataStr);
      downloadAnchorNode.setAttribute("backup", ".json");
      downloadAnchorNode.setAttribute("download", "backup.json");
      document.body.appendChild(downloadAnchorNode); // required for firefox
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
    }
  },
  created: async function() {
    const backups = await this.getBackups();
    if(backups.length > 0)
      this.last = backups[0].time;
    else
      this.last = 'No se ha hecho ningun respaldo';
  }
}
</script>

<style scoped>
.content {
  margin-top: 30px;
}

.spinner-border {
  width: 6rem;
  height: 6rem;
}

#backup-btn {
} #backup-area {
  width: 70%;
  margin: 10% auto 0px auto;
  text-align: center;
}
</style>
