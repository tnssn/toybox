<script>
// misskey
import * as Misskey from 'misskey-js'
export default{
    mounted(){
        console.log(import.meta.env.VITE_MISSKEY_TOKEN)
    },
    data() {
        return {
            cli: new Misskey.api.APIClient({
            origin: "https://misskey.systems",
            credential: import.meta.env.VITE_MISSKEY_TOKEN,
            }),
            meta: {},
            timeline:{},
            files:{},
            postContent: "",
        }
    },
    async mounted() {
    this.meta = await this.cli.request("i", { detail: true });
    },
    methods: {
        async getTimeline() {
            this.timeline = await this.cli.request("notes/local-timeline",{limit: 20});
            console.log(this.timeline)
        }, 
        async MisskeyPost() {
            await this.cli.request("notes/create", {text:this.postContent});
        },
        async getFiles() {
            this.files = await this.cli.request("drive/files", {limit:12});
            console.log(this.files)
        }
    }
}
</script>
<template>
    <div>
        <p>みすてむずのわたしの情報</p>
        <img :src="meta.avatarUrl" />

        <p>{{ meta.name }}</p>
    </div>
    <hr>

    <v-btn @click="getFiles">ふぁいるをとってみる</v-btn>
    <!-- {{ files }} -->
    <!-- 
    <v-card 
     variant="outlined"
     v-for="file in files" 
     :key="file" 
      class="mx-auto">
        <v-img 
         :src="file.thumbnailUrl"/>
        <v-card-title>
            {{ file.name }}
        </v-card-title>
    </v-card>
    ほげえ -->


    <v-container fluid>
      <v-row dense>
        <v-col 
        v-for="file in files" 
        :key="file" 
        >
          <v-card>
            <v-img
              :src="file.thumbnailUrl"
              class="align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
              cover
            >
            <v-card-title class="text-white" v-text="file.name"></v-card-title>
            </v-img>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <hr>
    <v-text-field variant="outlined" v-model="postContent"></v-text-field>
    <v-btn @click="MisskeyPost" class="bg-blue-accent-1">ぽすとみすきー！</v-btn>

    <hr>

    <v-btn @click="getTimeline">タイムラインを取得！</v-btn>
    <div class="timeline-no-soto"> 
        <v-list v-for="(item, key) in timeline" :key="key">
            <!-- <img :src="item.user.avatarUrl" style="width: 100px;"/> -->
            <v-avatar  size="x-large">
                <v-img :src="item.user.avatarUrl"/>
            </v-avatar>
            {{ item.user.name }}
            <div>
                {{ item.text }}
            </div>
        </v-list>
    </div>
    <!-- <pre>{{ timeline }}</pre> -->
</template>

<style scoped>
template{
    grid-template-columns: 800px;
}
.timeline-no-soto{
    margin: 1em 0;
}
</style>