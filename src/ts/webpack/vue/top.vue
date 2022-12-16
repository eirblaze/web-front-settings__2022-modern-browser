<template>
<dl class="contents-index-menu">

  <div class="contents-block" :key="contents_key" v-for="(site_content, contents_key) in site_contents">
    <dt class="middle-font">
      <a class="block-link" :href="site_content.href" :title="site_content.titleJp">
        {{site_content.titleEn}} - {{site_content.titleJp}}
      </a>
    </dt>
    <dd>
      <small class="example">{{site_content.description}}</small>
    </dd>
  </div>

</dl>
</template>

<script>
const site_contents = {
  sample: {
    href: "#t1",
    titleEn: "title text",
    titleJp: "タイトルテキスト",
    description: "詳細テキスト"
  },
  sub: {
    href: "#t2",
    titleEn: "mnop",
    titleJp: "サブ",
    description: "サブ詳細"
  },
}

export default {
  data () {
    return {
      site_contents: {
        sample: {
          href: "#t1",
          titleEn: "title text",
          titleJp: "タイトルテキスト",
          description: "詳細テキスト"
        },
        sub: {
          href: "#t2",
          titleEn: "mnop",
          titleJp: "サブ",
          description: "サブ詳細"
        },
      },
    }
  }
}


</script>

<style lang="scss">
body {
  .example {
    color: hsl(94, 61%, 55%)
  }
}
</style>

