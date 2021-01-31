class Tab extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        // 全部数据
        addressJobs: [
          {
            address: '北京',
            jobs: ['北京职位1', '北京职位2', '北京职位3', '北京职位4', '北京职位5', '北京职位6', '北京职位7', '北京职位8', '北京职位9']
          },
          {
            address: '上海',
            jobs: ['上海职位1', '上海职位2', '上海职位3', '上海职位4', '上海职位5', '上海职位6', '上海职位7', '上海职位8', '上海职位9']
          }
        ],
        jobssss: [],// 单独取出jobs渲染职位
      }
      this.adressNavClick = this.adressNavClick.bind(this);
    }
    componentDidMount() {
        document.getElementsByClassName('adress-item')[0].className = 'adress-item active';
        this.setState({
          jobssss: this.state.addressJobs[0].jobs
        })
      }
    // tab切换
    adressNavClick = (index) => {
        document.getElementsByClassName('adress-item')[index].className = 'adress-item active';
        this.state.addressJobs.forEach((el,item) => {
          if (item === index) {
            this.setState({
              jobssss: el.jobs
            })
          } else {
            document.getElementsByClassName('adress-item')[item].className = 'adress-item';
          }
        })
      }
    render() {
      return (
        <div className='recruit-content'>
            <ul className='adress-nav'>
            {this.state.addressJobs ? this.state.addressJobs.map((el, index) => {
                return (<li className='adress-item' key={index} onClick={() => {this.adressNavClick(index)}}>{el.address}</li>)
            }) : ''}
            </ul>
            <div className='jobs-wrapper'>
            <ul className='jobs-list clearfloat'>
                {this.state.jobssss ? this.state.jobssss.map((el, index) => {
                return (<li className='jobs-item' key={index}>{el}</li>)
                }) : ''}
            </ul>
            </div>
        </div>
      );
    }
  }
   
  ReactDOM.render(
    <Tab />,
    document.getElementById('example')
  );