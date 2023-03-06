import { defineComponent, ref } from 'vue'
import './index.css'

export const component = defineComponent({
  name: 'Component',
  props: {
    title: {
      type: String,
      default: '',
    },
    content: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const count = ref(0)
    const increment = () => count.value++
    return () => (
      <div>
        <h1 style="background:red;hi:123" className="red">{props.title}</h1>
        <p>{props.content}</p>
        <div onClick={increment}>
          count: {count.value}
        </div>
      </div>
    )
  },
})
