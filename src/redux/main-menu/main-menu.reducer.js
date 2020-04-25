
const constState = {
    sections: [
        {
            title: 'hats',
            imageUrl: 'https://i.ibb.co/cvpntL1/hats.png',
            id: 0,
            linkUrl: 'hats'
          },
          {
            title: 'jackets',
            imageUrl: 'https://i.ibb.co/px2tCc3/jackets.png',
            id: 1,
            linkUrl: 'jackets'
          },
          {
            title: 'sneakers',
            imageUrl: 'https://i.ibb.co/0jqHpnp/sneakers.png',
            id: 2,
            linkUrl: 'sneakers'
          },
          {
            title: 'womens',
            imageUrl: 'https://i.ibb.co/GCCdy8t/womens.png',
            size: 'large',
            id: 3,
            linkUrl: 'womens'
          },
          {
            title: 'mens',
            imageUrl: 'https://i.ibb.co/R70vBrQ/men.png',
            size: 'large',
            id: 4,
            linkUrl: 'mens'
          }
    ]
};

const mainMenuReducer = (state = constState, action ) => {
    switch(action.type){
        default:
            return state;
    }
};

export default mainMenuReducer;