export default {
   props: ['info'],
   template: `
        <section class="note-img">
            <div class="img-container">
               <img :src="info.url" alt="">
            </div>
            <div class="title">{{info.title}}</div>
        </section>
   `,
}