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
            uploadImage:{},
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
            await this.cli.request("notes/create", {
                text:this.postContent,
            });
            this.postContent = [];
        },
        async getFiles() {
            this.files = await this.cli.request("drive/files", {limit:4});
            console.log(this.files)
        },
        /*
        async setFile() {
            // ファイルのアップロードのところ //
            this.uploadImage = file.id
            console.log(this.uploadImage)
        },
        */
        // カンニングしてくっつけた添付を生でやるやつ //
       async uploadFile(){
        const params = new FormData();
        params.append("file", )
            const responce = await fetch(`${this.origin}/api/drive/files/create`, {
                method: 'POST',
                body:params,
                credentials: 'omit',
                cache: 'no-cache',
            })
        },
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

    
    <v-text-field variant="outlined" v-model="postContent"></v-text-field>
    <!--ボタンでくっつけるのはあとでやる <input type="file" @change="setFile" /> -->
    {{ uploadImage }}
    <v-btn @click="MisskeyPost" class="bg-blue-accent-1">Note</v-btn>

<hr>


    <v-btn @click="getFiles">ふぁいるをとってみる</v-btn>
    <v-container fluid>
      <v-row dense>
        <v-col 
        v-for="file in files" 
        :key="file" 
        >
          <v-card @click="this.uploadImage = file.id">
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
    {{ files }}

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