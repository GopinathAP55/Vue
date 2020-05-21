import { shallowMount, mount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'
import { expect } from 'chai'




describe('HelloWorld.vue', () => {
  it('h1 tag test', () => {
    const wrapper = shallowMount(HelloWorld)
    
    expect(wrapper.find('h1').text()).to.equal('gopi')
  })
})

describe('HelloWorld.vue',()=>{
  it('button test',() => {
    const clickValue=true;
    const wrapper = shallowMount(HelloWorld,{
      propsData: {
        //clickValue:false
      }
      
    })
    wrapper.find('button').trigger('click')
    expect(wrapper.vm.clickValue).to.equal(true)
  })
})