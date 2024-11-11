import { useEffect, useState } from 'react';

import { useNavigate, useParams } from '@umijs/max';

import { getBookByIdApi, updateBookApi } from '@/services/bookApi';

import { PageContainer } from '@ant-design/pro-components';
import { message } from 'antd';

import BookForm from './components/BookForm';

export default function BookEdit() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [bookInfo, setBookInfo] = useState({});

    useEffect(() => {
        if (id) {
            getBookByIdApi(id).then((res) => {
                setBookInfo(res.data);
            });
        }
    }, [id]);

    function submitHandle(bookIntro) {
        updateBookApi(id, { ...bookInfo, bookIntro });
        message.success('更新书籍成功！');
        navigate('/book/booklist');
    }

    return (
        <PageContainer>
            <div className="container" style={{ width: 800 }}>
                <BookForm
                    type="edit"
                    submitHandle={submitHandle}
                    bookInfo={bookInfo}
                    setBookInfo={setBookInfo}
                />
            </div>
        </PageContainer>
    );
}
