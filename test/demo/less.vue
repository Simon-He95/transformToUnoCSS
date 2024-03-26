<template>
	<div class="box">
		<UsePinia />
		<br />
		<router-link to="/login">点击跳转至login</router-link>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'index',
	components: {
	},
	setup() {
		const state = reactive({
			test: 'index',
		})
		return {
			...toRefs(state),
		}
	}
});
</script>
<style scoped lang="less">
.box {
	margin: 0 auto;
	border: 1px solid #f00;
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;
}
</style>
