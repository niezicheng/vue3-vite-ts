import { Dayjs, ConfigType } from 'dayjs';

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

type Person = {
  // 姓名
  name: string;
  // 背景
  bgColor: string;
  // 前置颜色
  prefixColor: string;
  // 月周数组
  monthWeeks: [
    {
      // 周
      time: [Dayjs | ConfigType, Dayjs | ConfigType];
      // 周天数组
      weekDays: [
        {
          // 日
          time: [Dayjs | ConfigType];
          // 工时数组
          workHours: [
            // 工时
            {
              // 工时标识
              workId: 1 | 2 | 3;
              project: string | Array<string>;
              pd: string | Array<string>;
              hour: number;
            }
          ];
        }
      ];
    }
  ];
};

export type Events = Array<Person>;

export const mockEvents = [
  {
    name: '李政',
    bgColor: '#DDEDFF',
    prefixColor: '#0073FF',
    monthWeeks: [
      {
        time: ['2021-12-26', '2022-1-1'],
        weekDays: [
          {
            time: '2021-12-28',
            workHours: [
              {
                workId: 1,
                hour: 1
              },
              {
                workId: 2,
                hour: 1
              },
              {
                workId: 3,
                hour: 1
              }
            ]
          },
          {
            time: '2021-12-29',
            workHours: [
              {
                workId: 1,
                hour: 1
              },
              {
                workId: 2,
                hour: 1
              },
              {
                workId: 3,
                hour: 1
              }
            ]
          },
          {
            time: '2021-12-30',
            workHours: [
              {
                workId: 1,
                hour: 1
              },
              {
                workId: 2,
                hour: 1
              },
              {
                workId: 3,
                hour: 1
              }
            ]
          },
          {
            time: '2021-12-31',
            workHours: [
              {
                workId: 1,
                hour: 1
              }
            ]
          }
        ]
      },
      {
        time: ['2022-1-2', '2022-1-8'],
        weekDays: [
          {
            time: '2022-1-2',
            workHours: [
              {
                workId: 1,
                hour: 1
              },
              {
                workId: 2,
                hour: 1
              }
            ]
          },
          {
            time: '2022-1-3',
            workHours: [
              {
                workId: 2,
                hour: 1
              },
              {
                workId: 3,
                hour: 1
              }
            ]
          },
          {
            time: '2022-1-4',
            workHours: [
              {
                workId: 1,
                hour: 1
              },
              {
                workId: 3,
                hour: 1
              }
            ]
          }
        ]
      }
    ]
  },
  {
    name: '陈燮民',
    bgColor: 'rgba(227,246,231,1)',
    prefixColor: 'rgba(0,179,93,1)',
    monthWeeks: [
      {
        time: ['2022-1-2', '2022-1-8'],
        weekDays: [
          {
            time: '2022-1-2',
            workHours: [
              {
                workId: 1,
                hour: 1
              },
              {
                workId: 3,
                hour: 1
              }
            ]
          },
          {
            time: '2022-1-3',
            workHours: [
              {
                workId: 1,
                hour: 1
              },
              {
                workId: 2,
                hour: 1
              },
              {
                workId: 3,
                hour: 1
              }
            ]
          },
          {
            time: '2022-1-4',
            workHours: [
              {
                workId: 1,
                hour: 1
              },
              {
                workId: 2,
                hour: 1
              }
            ]
          }
        ]
      }
    ]
  },
  {
    name: '陈灵炜',
    bgColor: 'rgba(255,240,209,1)',
    prefixColor: 'rgba(250,119,10,1)',
    monthWeeks: [
      {
        time: ['2021-12-26', '2022-1-1'],
        weekDays: [
          {
            time: '2021-12-28',
            workHours: [
              {
                workId: 1,
                hour: 1
              },
              {
                workId: 2,
                hour: 1
              },
              {
                workId: 3,
                hour: 1
              }
            ]
          },
          {
            time: '2021-12-29',
            workHours: [
              {
                workId: 1,
                hour: 1
              },
              {
                workId: 2,
                hour: 1
              },
              {
                workId: 3,
                hour: 1
              }
            ]
          },
          {
            time: '2021-12-30',
            workHours: [
              {
                workId: 1,
                hour: 1
              },
              {
                workId: 2,
                hour: 1
              },
              {
                workId: 3,
                hour: 1
              }
            ]
          },
          {
            time: '2021-12-31',
            workHours: [
              {
                workId: 1,
                hour: 1
              }
            ]
          }
        ]
      },
      {
        time: ['2022-1-2', '2022-1-8'],
        weekDays: [
          {
            time: '2022-1-2',
            workHours: [
              {
                workId: 1,
                hour: 1
              },
              {
                workId: 2,
                hour: 1
              }
            ]
          },
          {
            time: '2022-1-3',
            workHours: [
              {
                workId: 2,
                hour: 1
              },
              {
                workId: 3,
                hour: 1
              }
            ]
          },
          {
            time: '2022-1-4',
            workHours: [
              {
                workId: 1,
                hour: 1
              },
              {
                workId: 3,
                hour: 1
              }
            ]
          }
        ]
      }
    ]
  },
  {
    name: '俞叠',
    bgColor: 'rgba(237,226,255,1)',
    prefixColor: 'rgba(125,47,244,1)',
    monthWeeks: [
      {
        time: ['2022-1-2', '2022-1-8'],
        weekDays: [
          {
            time: '2022-1-2',
            workHours: [
              {
                workId: 1,
                hour: 1
              },
              {
                workId: 3,
                hour: 1
              }
            ]
          },
          {
            time: '2022-1-3',
            workHours: [
              {
                workId: 1,
                hour: 1
              },
              {
                workId: 2,
                hour: 1
              },
              {
                workId: 3,
                hour: 1
              }
            ]
          },
          {
            time: '2022-1-4',
            workHours: [
              {
                workId: 1,
                hour: 1
              },
              {
                workId: 2,
                hour: 1
              }
            ]
          }
        ]
      }
    ]
  }
];
