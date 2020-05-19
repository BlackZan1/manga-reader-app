import React from 'react';
import { Card, Divider } from 'antd';

import './ChapterList.scss';

const ChapterList = ({ chapters, onClickHandler }) => {
    return (
        <div className='chapters-list'>
            <Divider style={{color: '#fff', fontSize: '2rem', fontFamily: 'Lobster, Arial, sans-serif' }}>Chapters</Divider>

            {
                chapters.map(chapter => {
                    let chapterName = !!chapter[2] ? chapter[2] : 'Unknown';

                    return (
                        <Card
                            key={chapter[3]}
                            className='chapter-list-item'
                            style={{color: '#fff', margin: '10px auto'}}
                            title={chapterName} 
                            extra={
                                <p style={{fontSize: 24, fontWeight: '500'}}>
                                    {`№ ${chapter[0]}`}
                                </p>
                            }
                            onClick={() => onClickHandler(chapter[3], chapterName, chapter[0])}
                        >
                            {
                                new Date(chapter[1] * 1000).toLocaleDateString()
                            }
                        </Card>
                    )
                })
            }
        </div>
    )
}

export default ChapterList;