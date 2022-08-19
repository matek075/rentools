import React from 'react';
import { FieldArray, Form, Formik, Field, FormikHelpers } from 'formik';
import { faTrash } from '@fortawesome/pro-solid-svg-icons/faTrash';
import { faPlus } from '@fortawesome/pro-solid-svg-icons/faPlus';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useIntl } from 'react-intl';

import { useQuestions } from 'context/company/useQuestions';
import { putQuestions, QuestionAnswerDto } from 'utils/company/questions';
import Textarea from 'components/form/fields/Textarea';
import Row from 'components/form/fields/Row';
import Button from 'components/ui/Button';
import { applyErrors } from 'utils/formik';
import Alert from 'components/ui/Alert';
import Autocomplete from 'components/form/fields/Autocomplete';
import { companyContext } from 'context/company';

interface FormData {
  questions: QuestionAnswerDto;
}

const CompanyQuestions: React.FC = () => {
  const companyState = React.useContext(companyContext);
  const intl = useIntl();
  const [questions] = useQuestions();

  const handleSubmit = async (values: FormData, helpers: FormikHelpers<FormData>) => {
    helpers.setSubmitting(true);
    try {
      await putQuestions(values.questions);
      window.notyf.success(intl.formatMessage({ id: 'ui.saved' }));
      await companyState.loadCompany();
    } catch (e) {
      applyErrors(e, helpers);
    }
    helpers.setSubmitting(false);
  };

  const initialValues: FormData = {
    questions: questions.map((q) => ({
      title: q.title,
      answer: q.answer,
    })),
  };

  const suggestions: string[] = [
    'Kto może wynająć oferowany sprzęt?',
    'Jakie dokumenty są wymagane w celu realizacji wynajmu sprzętu?',
    'Czy sprzęt może zostać odebrany przez inną osobę?',
    'Czy kaucja za wynajem jest obowiązkowa?',
    'W jakiej formie pobierana jest kaucja?',
    'Kiedy następuje zwrot kaucji za wynajem sprzetu?',
    'Czy jest możliwość transportu sprzętu pod wskazany adres?',
    'Jak liczona jest doba rezerwacji?',
    'Co się dzieje w przypadku nagłej awarii sprzętu?',
    'Czy jest coś o czym powinienem wiedzieć dodatkowo?',
    'Czy jest możliwość zmiany terminu zwrotu sprzętu?',
  ];

  return (
    <div>
      <Formik initialValues={initialValues} enableReinitialize onSubmit={handleSubmit}>
        {(form) => (
          <Form>
            <FieldArray
              name="questions"
              render={(helpers) => (
                <div>
                  {form.values.questions.map((_question, index) => (
                    <div key={index}>
                      <h6>
                        Pytanie #{index + 1}{' '}
                        <Button
                          color="link-red"
                          size="sm"
                          className="ml-2"
                          type="button"
                          onClick={() => helpers.remove(index)}>
                          <FontAwesomeIcon icon={faTrash} className="mr-1" />
                          Usuń
                        </Button>
                      </h6>

                      <Row>
                        <Field
                          label="Pytanie"
                          component={Autocomplete}
                          options={suggestions.map((s) => ({
                            value: s,
                            label: s,
                          }))}
                          name={`questions.${index}.title`}
                          showOnFocus
                        />
                      </Row>
                      <Row>
                        <Field label="Odpowiedź" component={Textarea} name={`questions.${index}.answer`} />
                      </Row>
                      <Field type="hidden" name={`questions.${index}.order`} value={index + 1} />
                      <Button
                        color="link-secondary"
                        type="button"
                        onClick={() =>
                          helpers.insert(index + 1, {
                            title: '',
                            answer: '',
                          })
                        }>
                        <FontAwesomeIcon icon={faPlus} className="mr-1" /> Dodaj pytanie
                      </Button>
                    </div>
                  ))}
                  {!form.values.questions.length && (
                    <div>
                      <div className="text-gray-400">Nie masz jeszcze żadnych dodanych pytań</div>
                      <Button
                        color="link-secondary"
                        type="button"
                        onClick={() =>
                          helpers.push({
                            title: '',
                            answer: '',
                          })
                        }>
                        <FontAwesomeIcon icon={faPlus} className="mr-1" /> Dodaj pytanie
                      </Button>
                    </div>
                  )}
                </div>
              )}
            />
            {!!form.errors.questions && typeof form.errors.questions === 'string' && (
              <Alert type="danger" text={form.errors.questions} className="mb-3" />
            )}
            {form.dirty && (
              <Button type="submit" color="primary" block loading={form.isSubmitting}>
                Zapisz zmiany
              </Button>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CompanyQuestions;
