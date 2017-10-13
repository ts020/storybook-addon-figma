import React from 'react'
import addons from '@storybook/addons'
import { EVENT_ID } from './shared'
import Vue from 'vue'

export const WithFigma = ({
  children,
  url,
  allowFullScreen,
  embedHost,
}) => {
  addons.getChannel().emit(EVENT_ID, {
    url,
    allowFullScreen,
    embedHost,
  })
  return children
}

export const WithFigmaVue = Vue.component('with-figma-vue', {
    props: {
        url            : { type: String },
        allowFullScreen: { type: Boolean, default: true },
        embedHost      : { type: String, default: 'storybook' },
    },
    render (createElement) {
        return createElement('iframe',
            {
                attrs: {
                    height     : '100%',
                    width      : '100%',
                    frameBorder: '0',
                    src        : 'https://www.figma.com/embed?embed_host=' + this.embedHost + '&url=' + this.url,
                    allowFullScreen: this.allowFullScreen
                }
            },
            this.$slots.default
        )
    }
})


export default ({
  url,
  allowFullScreen,
  embedHost,
}) => getStory => {
  addons.getChannel().emit(EVENT_ID, {
    url,
    allowFullScreen,
    embedHost,
  })
  return getStory()
};

function checkA11y(storyFn, context) {
  const channel = addons.getChannel();
  return manager.wrapStory(channel, storyFn, context);
}
