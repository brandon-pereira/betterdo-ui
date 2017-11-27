export default () => ({
  currentList:{
    _id: 0,
    title: "Loading...",
    tasks: [
      "test",
      "test1",
      "test2"
    ]
  },
  lists: [
    {
      title: "aaa",
      selected: true
    },
    {
      title: "test",
      color: 'blue'
    },
    {
      title: "test"
    }
  ],
  modals: {
    newList: {
      visible: false,
    },
    appSettings: {
      visible: false,
    },
    listSettings: {
      visible: false,
    }
  }
});