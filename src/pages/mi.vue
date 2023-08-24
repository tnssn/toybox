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
            uploadImage:[],
            file:{},
        }
    },
    async mounted() {
    this.meta = await this.cli.request("i", { detail: true });
    },
    methods: {
        /* タイムラインの取得 */
        async getTimeline() {
            this.timeline = await this.cli.request("notes/local-timeline",{limit: 20});
            console.log(this.timeline)
        }, 

        /* 投稿 */
        async MisskeyPost() {
            await this.cli.request("notes/create", {
                text:this.postContent,
                fileIds: this.uploadImage
            });
            this.postContent = [];
            this.uploadImage = [];
        },

        /* ドライブの取得 */ 
        async getFiles() {
            this.files = await this.cli.request("drive/files", {limit:12});
            console.log(this.files)
        },

        /* ドライブからファイルを投稿にくっつける */
        setFile(file) {
            this.uploadImage.push( file.id )
            console.log(this.uploadImage)
        },

        /* ファイルをアップロードして投稿 */
        /* 中村さんのを今コピペして持ってきただけだから書き換える！！！！！！ */
       async uploadFile(){
        // ファイル投稿フォーム作成して選択したファイルをparams.fileにセット
        const params = new FormData();
        params.append("file", this.$refs.image.files[0]);

        // その他のパラメータをセット
        params.append("i", import.meta.env.VITE_MISSKEY_TOKEN);
        params.append("force", this.$refs.image.files[0]);
        params.append("name", this.$refs.image.files[0].name);

        console.log(this.params)
        // POSTでfetch
        const response = await fetch(`${this.cli.origin}/api/drive/files/create`, {
            method: 'POST',
            body: params,
            credentials: 'omit',
            cache: 'no-cache',
        })
        // ファイルをドライブにアップロードじゃ！
        this.upFile = await response.json();
        // 投稿を押したら画像も一緒に投稿できるように戻ってきたファイルIDをファイルリストに追加しておく
        this.upFileList.push(this.upFile.id);
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
        <input type="file" @change="uploadFile" />
        <br>
        添付画像id：{{ uploadImage }}
        <v-btn @click="MisskeyPost" class="bg-blue-accent-1">Note</v-btn>

<hr>


    <v-btn @click="getFiles">ふぁいるをとってみる</v-btn>
    <v-container fluid>
      <v-row dense>
        <v-col 
        v-for="file in files" 
        :key="file" 
        >
          <v-card @click="setFile(file)">
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