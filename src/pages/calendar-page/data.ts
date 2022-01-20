import dayjs from 'dayjs';

const today = dayjs().format('YYYY-MM-DD');
const tomorrow = dayjs().add(1, 'days').format('YYYY-MM-DD');
const addThree = dayjs().add(3, 'days').format('YYYY-MM-DD');
const addTen = dayjs().add(10, 'days').format('YYYY-MM-DD');
const other = dayjs().add(20, 'days').format('YYYY-MM-DD');

export const eventData = [
  {
    id: 1,
    startAt: `${today} 14:00:00`,
    endAt: `${other} 15:00:00`,
    name: '李政',
    bgColor: '#DDEDFF',
    prefixColor: '#0073FF'
  },
  {
    id: 2,
    startAt: `${today} 14:00:00`,
    endAt: `${addThree} 15:00:00`,
    name: '曹越',
    bgColor: 'rgba(227,246,231,1)',
    prefixColor: 'rgba(0,179,93,1)'
  },
  {
    id: 3,
    startAt: `${today} 14:00:00`,
    endAt: `${addTen} 15:00:00`,
    name: '张智翔',
    bgColor: 'rgba(255,240,209,1)',
    prefixColor: 'rgba(250,119,10,1)'
  },
  {
    id: 4,
    startAt: `${today} 14:00:00`,
    endAt: `${addTen} 15:00:00`,
    name: '王梦',
    bgColor: 'rgba(255,230,223,1)',
    prefixColor: 'rgba(250,84,70,1)'
  },
  {
    id: 5,
    startAt: `${tomorrow} 14:00:00`,
    endAt: `${addTen} 15:00:00`,
    name: '唐娟',
    bgColor: 'rgba(237,226,255,1)',
    prefixColor: 'rgba(125,47,244,1)'
  },
  {
    id: 6,
    startAt: `${today} 14:00:00`,
    endAt: `${other} 15:00:00`,
    name: '陈燮民',
    bgColor: '#DDEDFF',
    prefixColor: '#0073FF'
  },
  {
    id: 7,
    startAt: `${today} 14:00:00`,
    endAt: `${addThree} 15:00:00`,
    name: '陈灵炜',
    bgColor: 'rgba(227,246,231,1)',
    prefixColor: 'rgba(0,179,93,1)'
  },
  {
    id: 8,
    startAt: `${today} 14:00:00`,
    endAt: `${addTen} 15:00:00`,
    name: '赵欢',
    bgColor: 'rgba(255,240,209,1)',
    prefixColor: 'rgba(250,119,10,1)'
  },
  {
    id: 9,
    startAt: `${today} 14:00:00`,
    endAt: `${addTen} 15:00:00`,
    name: '尹帅英',
    bgColor: 'rgba(255,230,223,1)',
    prefixColor: 'rgba(250,84,70,1)'
  },
  {
    id: 10,
    startAt: `${tomorrow} 14:00:00`,
    endAt: `${addTen} 15:00:00`,
    name: '俞叠',
    bgColor: 'rgba(237,226,255,1)',
    prefixColor: 'rgba(125,47,244,1)'
  },
  {
    id: 11,
    startAt: `${today} 14:00:00`,
    endAt: `${addTen} 15:00:00`,
    name: '辛悦',
    bgColor: 'rgba(255,240,209,1)',
    prefixColor: 'rgba(250,119,10,1)'
  },
  {
    id: 12,
    startAt: `${today} 14:00:00`,
    endAt: `${addTen} 15:00:00`,
    name: '刘晓庆',
    bgColor: 'rgba(255,240,209,1)',
    prefixColor: 'rgba(250,119,10,1)'
  }
];

export const headerData = [
  {
    label: '李政'
  },
  {
    label: '曹越'
  },
  {
    label: '张智翔'
  },
  {
    label: '王梦'
  },
  {
    label: '唐娟'
  },
  {
    label: '陈燮民',
    avatar:
      'http://pic1.zhimg.com/v2-cda469e0afc9b0376b4ce69d79601bbe_1440w.jpg'
  },
  {
    label: '陈灵炜',
    avatar:
      'http://pic1.zhimg.com/v2-cda469e0afc9b0376b4ce69d79601bbe_1440w.jpg'
  },
  {
    label: '赵欢'
  },
  {
    label: '尹帅英'
  },
  {
    label: '俞叠'
  },
  {
    label: '辛悦'
  },
  {
    label: '刘晓庆'
  }
];
