import React, { useEffect, useState } from 'react';
import { List } from 'antd';
import axios from 'axios';

function DetailDiaryPage(props) {
    const diaryId = props.match.params.diaryId;
    const [Diary, setDiary] = useState([]);

    const diaryVariable = {
        diaryId: diaryId
    };

    const [DiaryDetail, setDiaryDetail] = useState([])

    useEffect(() => {
        axios.post('/api/diary/getDiary', diaryVariable)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.diary);
                    setDiaryDetail(response.data.diaryDetail);
                } else {
                    alert('일기 정보를 가져오는데 실패했습니다');
                }
            });
    }, []);

    if (Diary.writer) {
        return (
            <div style={{ width: '100%', padding: '3rem 4em' }}>
                <List.Item>
                    <List.Item.Meta
                        title={DiaryDetail.title}
                        description={DiaryDetail.description}
                    />
                </List.Item>
            </div>
        );
    } else {
        return (
            <div>Loading...</div>
        );
    }
}

export default DetailDiaryPage;
