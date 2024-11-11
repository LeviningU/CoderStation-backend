import { useState } from 'react';

import { useNavigate } from '@umijs/max';

import { PageContainer } from '@ant-design/pro-components';
import { message } from 'antd';

import BookForm from './components/BookForm';

import { addBookApi } from '@/services/bookApi';

export default function BookAdd(props) {
    const [newBookInfo, setNewBookInfo] = useState({
        bookTitle: '',
        bookIntro: '',
        downloadLink: '',
        requirePoints: '',
        bookPic: '',
        typeId: '',
    });

    const navigate = useNavigate();

    function submitHandle(bookIntro) {
        addBookApi({
            ...newBookInfo,
            bookIntro,
        });
        message.success('添加书籍成功！');
        navigate('/book/booklist');
    }

    return (
        <PageContainer>
            <div className="container" style={{ width: 1000 }}>
                <BookForm
                    type="add"
                    bookInfo={newBookInfo}
                    setBookInfo={setNewBookInfo}
                    submitHandle={submitHandle}
                ></BookForm>
            </div>
        </PageContainer>
    );
}
