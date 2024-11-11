import { useEffect, useRef, useState } from 'react';

import { useDispatch, useSelector } from '@umijs/max';

import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Image, Input, Select, Upload } from 'antd';

import '@toast-ui/editor/dist/i18n/zh-cn';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';

import { typeOptionCreator } from '@/utils/tool';

export default function BookForm({
    type,
    bookInfo,
    setBookInfo,
    submitHandle,
}) {
    const formRef = useRef();
    const editorRef = useRef();

    const dispatch = useDispatch();

    const typeList = useSelector((state) => state.typeModal.typeList);

    useEffect(() => {
        if (typeList.length === 0) {
            dispatch({ type: 'typeModal/_getTypeList' });
        }
    }, [typeList.length]);

    const [first, setFirst] = useState(true);

    useEffect(() => {
        if (first && type === 'edit' && bookInfo.bookIntro) {
            if (formRef.current && editorRef.current) {
                formRef.current.setFieldsValue(bookInfo);
                editorRef.current.getInstance().setHTML(bookInfo?.bookIntro);
                setFirst(false);
            }
        }
    }, [bookInfo, type]);

    function updateInfo(newContent, key) {
        setBookInfo({
            ...bookInfo,
            [key]:
                typeof newContent === 'string' ? newContent.trim() : newContent,
        });
    }

    let bookPicPreview = null;
    if (type === 'edit') {
        bookPicPreview = (
            <Form.Item label="当前封面" name="bookPicPreview">
                {bookInfo?.bookPic ? (
                    <Image src={bookInfo?.bookPic} width={100} />
                ) : (
                    <div>暂无封面</div>
                )}
            </Form.Item>
        );
    }

    function addHandle() {
        const content = editorRef.current.getInstance().getHTML();
        submitHandle(content);
    }

    function handlePointChange(value) {
        updateInfo(value, 'requirePoints');
    }

    function handleTypeChange(value) {
        updateInfo(value, 'typeId');
    }

    return (
        <Form
            name="basic"
            initialValues={bookInfo}
            autoComplete="off"
            ref={formRef}
            onFinish={addHandle}
            labelCol={{ span: 3 }}
        >
            <Form.Item
                label="书籍标题"
                name="bookTitle"
                rules={[{ required: true, message: '请输入书名' }]}
            >
                <Input
                    value={bookInfo?.bookTitle}
                    onChange={(e) => updateInfo(e.target.value, 'bookTitle')}
                />
            </Form.Item>

            <Form.Item
                label="书籍介绍"
                name="bookIntro"
                rules={[{ required: true, message: '请输入书本相关的介绍' }]}
            >
                <Editor
                    initialValue=""
                    previewStyle="vertical"
                    height="600px"
                    initialEditType="markdown"
                    useCommandShortcut={true}
                    language="zh-CN"
                    ref={editorRef}
                />
            </Form.Item>

            <Form.Item
                label="下载链接"
                name="downloadLink"
                rules={[{ required: true, message: '请输入书籍链接' }]}
            >
                <Input
                    value={bookInfo?.downloadLink}
                    onChange={(e) => updateInfo(e.target.value, 'downloadLink')}
                />
            </Form.Item>

            <Form.Item
                label="所需积分"
                name="requirePoints"
                rules={[{ required: true, message: '请选择下载所需积分' }]}
            >
                <Select style={{ width: 200 }} onChange={handlePointChange}>
                    <Select.Option value={20} key={20}>
                        20
                    </Select.Option>
                    <Select.Option value={30} key={30}>
                        30
                    </Select.Option>
                    <Select.Option value={40} key={40}>
                        40
                    </Select.Option>
                </Select>
            </Form.Item>

            <Form.Item
                label="书籍分类"
                name="typeId"
                rules={[{ required: true, message: '请选择书籍分类' }]}
            >
                <Select style={{ width: 200 }} onChange={handleTypeChange}>
                    {typeOptionCreator(Select, typeList)}
                </Select>
            </Form.Item>

            {bookPicPreview}

            <Form.Item
                label="书籍封面"
                valuePropName="fileList"
                getValueFromEvent={(e) => e.fileList}
            >
                <Upload
                    action="/api/upload"
                    listType="picture-card"
                    maxCount={1}
                    onChange={(e) => {
                        if (e.file.status === 'done') {
                            // 说明上传已经完成
                            const url = e.file.response.data;
                            updateInfo(url, 'bookPic');
                        }
                    }}
                >
                    <PlusOutlined />
                </Upload>
            </Form.Item>

            {/* 确认修改按钮 */}
            <Form.Item wrapperCol={{ offset: 3, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    {type === 'add' ? '新增' : '修改'}
                </Button>

                <Button type="link" htmlType="reset" className="resetBtn">
                    重置
                </Button>
            </Form.Item>
        </Form>
    );
}
