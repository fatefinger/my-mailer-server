/**
 * Created by 杨帆 on 2018/1/30.
 */
const obj = {
  title: 'Portrayal',
  key: 'portrayal',
  render: (h, params) => {
    return h('Poptip', {
      props: {
        trigger: 'hover',
        title: params.row.portrayal.length + 'portrayals',
        placement: 'bottom'
      }
    }, [
      h('Tag', params.row.portrayal.length),
      h('div', {
        slot: 'content'
      }, [
        h('ul', this.tableData1[params.index].portrayal.map(item => {
          return h('li', {
            style: {
              textAlign: 'center',
              padding: '4px'
            }
          }, item)
        }))
      ])
    ]);
  }
},
