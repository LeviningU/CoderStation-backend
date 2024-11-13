import { useEffect, useRef, useState } from 'react';

import { useDispatch, useSelector } from '@umijs/max';

import { Button, Form, Input, Select } from 'antd';

import '@toast-ui/editor/dist/i18n/zh-cn';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';

import { typeOptionCreator } from '@/utils/tool';

export default function InterviewForm({
    type,
    interviewInfo,
    setInterviewInfo,
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
        if (first && type === 'edit' && interviewInfo.interviewContent) {
            if (formRef.current && editorRef.current) {
                formRef.current.setFieldsValue(interviewInfo);
                editorRef.current
                    .getInstance()
                    .setHTML(interviewInfo?.interviewContent);
                setFirst(false);
            }
        }
    }, [interviewInfo, type]);

    function updateInfo(newContent, key) {
        setInterviewInfo({
            ...interviewInfo,
            [key]:
                typeof newContent === 'string' ? newContent.trim() : newContent,
        });
    }

    function addHandle() {
        const content = editorRef.current.getInstance().getHTML();
        submitHandle(content);
    }

    function handleTypeChange(value) {
        updateInfo(value, 'typeId');
    }

    return (
        <Form
            name="basic"
            initialValues={interviewInfo}
            autoComplete="off"
            ref={formRef}
            onFinish={addHandle}
            labelCol={{ span: 3 }}
        >
            <Form.Item
                label="题目标题"
                name="interviewTitle"
                rules={[{ required: true, message: '请输入标题' }]}
            >
                <Input
                    value={interviewInfo?.interviewTitle}
                    onChange={(e) =>
                        updateInfo(e.target.value, 'interviewTitle')
                    }
                />
            </Form.Item>

            <Form.Item
                label="题目分类"
                name="typeId"
                rules={[{ required: true, message: '请选择题目分类' }]}
            >
                <Select style={{ width: 200 }} onChange={handleTypeChange}>
                    {typeOptionCreator(Select, typeList)}
                </Select>
            </Form.Item>

            <Form.Item
                label="题目内容"
                name="interviewContent"
                rules={[{ required: true, message: '请输入题目内容' }]}
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
