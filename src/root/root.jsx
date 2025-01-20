import React, { useState, useEffect } from "react";
import { Form, Input, Button, Card } from "antd";
import styled from "styled-components";
import { AlignmentType, Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";

const Container = styled.div`
  max-width: 600px;
  margin: 50px auto;
`;

const TestForm = () => {
  const [form] = Form.useForm();
  const [questions, setQuestions] = useState(
    JSON.parse(localStorage.getItem("questions")) || []
  );

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("questions"))?.length === 0) {
      localStorage.setItem("questions", JSON.stringify(questions));
    }
  }, [questions]);

  const onFinish = (values) => {
    setQuestions([...questions, values]);
    localStorage.setItem("questions", JSON.stringify([...questions, values]));
    form.resetFields();
  };

  const generateWordFiles = () => {
    const shuffleArray = (array) => {
      return array.sort(() => Math.random() - 0.5);
    };

    const chunks = (arr, size) => {
      return Array.from({ length: Math.ceil(arr.length / size) }, (_, index) =>
        arr.slice(index * size, index * size + size)
      );
    };

    const questionChunks = chunks(shuffleArray(questions), 25);

    const CreateVariant = () => {
      const createDocument = (chunks) => {
        return new Document({
          sections: chunks.map((chunk, variantIndex) => ({
            properties: {},
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: `Variant ${variantIndex + 1}`,
                    bold: true,
                    font: "Arial",
                    size: 24,
                  }),
                ],
              }),
              ...chunk.flatMap((q, index) => [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: `${index + 1}. ${q.question}`,
                      bold: true,
                      font: "Arial",
                      size: 22,
                    }),
                  ],
                }),
                ...shuffleArray([
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: `Birinchi javob: ${q.correctAnswer}`,
                        font: "Arial",
                        size: 20,
                      }),
                    ],
                  }),
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: `Ikkinchi javob: ${q.wrongAnswer1}`,
                        font: "Arial",
                        size: 20,
                      }),
                    ],
                  }),
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: `Uchinchi javob: ${q.wrongAnswer2}`,
                        font: "Arial",
                        size: 20,
                      }),
                    ],
                  }),
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: `To'rtinchi javob: ${q.wrongAnswer3}`,
                        font: "Arial",
                        size: 20,
                      }),
                    ],
                  }),
                ]),
                new Paragraph({
                  children: [new TextRun({ text: "\n" })],
                }),
              ]),
            ],
          })),
        });
      };
      const createAnswersDocument = (chunks) => {
        return new Document({
          sections: chunks.map((chunk, variantIndex) => ({
            properties: {},
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: `Variant ${variantIndex + 1} Javoblari`,
                    bold: true,
                    font: "Arial",
                    size: 24,
                  }),
                ],
              }),
              ...chunk.flatMap((q, index) => [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: `${index + 1}. ${q.question}`,
                      bold: true,
                      font: "Arial",
                      size: 22,
                    }),
                  ],
                }),
                new Paragraph({
                  children: [
                    new TextRun({
                      text: `To'g'ri javob: ${q.correctAnswer}`,
                      bold: true,
                      font: "Arial",
                      size: 20,
                    }),
                  ],
                }),
                new Paragraph({
                  children: [new TextRun({ text: "\n" })],
                }),
              ]),
            ],
          })),
        });
      };
    };

    const createDocument = (chunks) => {
      return new Document({
        sections: chunks.map((chunk, variantIndex) => ({
          properties: {},
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({
                  text: `${variantIndex + 1} - variant`,
                  bold: true,
                  font: "Arial",
                  size: 24,
                }),
              ],
            }),
            ...chunk.flatMap((q, index) => [
              new Paragraph({
                children: [
                  new TextRun({
                    text: `${index + 1}. ${q.question}`,
                    bold: true,
                    font: "Arial",
                    size: 18,
                  }),
                ],
              }),
              ...shuffleArray([
                new Paragraph({
                  children: [
                    new TextRun({
                      text: `A) ${q.correctAnswer}`,
                      font: "Arial",
                      size: 18,
                    }),
                  ],
                }),
                new Paragraph({
                  children: [
                    new TextRun({
                      text: `B): ${q.wrongAnswer1}`,
                      font: "Arial",
                      size: 18,
                    }),
                  ],
                }),
                new Paragraph({
                  children: [
                    new TextRun({
                      text: `C) ${q.wrongAnswer2}`,
                      font: "Arial",
                      size: 18,
                    }),
                  ],
                }),
                new Paragraph({
                  children: [
                    new TextRun({
                      text: `D): ${q.wrongAnswer3}`,
                      font: "Arial",
                      size: 18,
                    }),
                  ],
                }),
              ]),
              new Paragraph({
                children: [new TextRun({ text: "\n\n" })],
              }),
            ]),
          ],
        })),
      });
    };

    const createAnswersDocument = (chunks) => {
      console.log(chunks);

      return new Document({
        sections: chunks.map((chunk, variantIndex) => ({
          properties: {},
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,

              children: [
                new TextRun({
                  text: `${variantIndex + 1}-variant javoblari`,
                  bold: true,
                  font: "Arial",
                  size: 24,
                }),
              ],
            }),
            ...chunk.flatMap((q, index) => [
              new Paragraph({
                children: [
                  new TextRun({
                    text: `${index + 1}. ${q.question}`,
                    bold: true,
                    font: "Arial",
                    size: 18,
                  }),
                ],
              }),

              new Paragraph({
                children: [
                  new TextRun({
                    text: `To'g'ri javob: ${q.correctAnswer}`,
                    bold: false,
                    font: "Arial",
                    size: 18,
                  }),
                ],
              }),
              new Paragraph({
                children: [new TextRun({ text: "\n\n" })],
              }),
            ]),
          ],
        })),
      });
    };

    const questionsDoc = createDocument(questionChunks);
    const answersDoc = createAnswersDocument(questionChunks);

    Packer.toBlob(questionsDoc).then((blob) => {
      saveAs(blob, "Savollar.docx");
    });

    Packer.toBlob(answersDoc).then((blob) => {
      saveAs(blob, "Javoblar.docx");
    });
  };

  return (
    <Container>
      <Card title="Savol qo'shish" style={{ marginBottom: "20px" }}>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Savol nomi"
            name="question"
            rules={[{ required: true, message: "Iltimos, savolni kiriting!" }]}
          >
            <Input placeholder="Savol nomi" />
          </Form.Item>
          <Form.Item
            label="To'g'ri javob"
            name="correctAnswer"
            rules={[
              { required: true, message: "Iltimos, to'g'ri javobni kiriting!" },
            ]}
          >
            <Input placeholder="To'g'ri javob" />
          </Form.Item>
          {[1, 2, 3].map((num) => (
            <Form.Item
              key={num}
              label={`Noto'g'ri javob ${num}`}
              name={`wrongAnswer${num}`}
              rules={[
                {
                  required: true,
                  message: `Iltimos, noto'g'ri javob ${num}ni kiriting!`,
                },
              ]}
            >
              <Input placeholder={`Noto'g'ri javob ${num}`} />
            </Form.Item>
          ))}
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Qo'shish
            </Button>
          </Form.Item>
        </Form>
      </Card>

      <Card title="Qo'shilgan savollar" style={{ marginBottom: "20px" }}>
        {questions.length === 0 ? (
          <p>Hozircha savollar yo'q.</p>
        ) : (
          questions.map((q, index) => (
            <Card key={index} style={{ marginBottom: "10px" }}>
              <p>
                <strong>Savol:</strong> {q.question}
              </p>
              <ul>
                <li>
                  <b>A) {q.correctAnswer}</b>
                </li>
                <li>B) {q.wrongAnswer1}</li>
                <li>C) {q.wrongAnswer2}</li>
                <li>D) {q.wrongAnswer3}</li>
              </ul>
            </Card>
          ))
        )}
      </Card>

      <Button type="primary" onClick={generateWordFiles}>
        Yaqinlash va Word fayllarini yuklab olish
      </Button>
    </Container>
  );
};

const App = () => <TestForm />;

export default App;
