import React, { ComponentPropsWithoutRef, FormEventHandler } from 'react';

/* Type for Molecules */
/**
 * @see {@link Form}
 */
type FormContents = {
  Reset: typeof FormReset;
  Submit: typeof FormSubmit;
  Cancel: typeof FormCancel;
};
export type FormProps = ComponentPropsWithoutRef<'form'>;
type FormResetProps = ComponentPropsWithoutRef<'button'>;
type FormSubmitProps = ComponentPropsWithoutRef<'button'>;
type FormCancelProps = ComponentPropsWithoutRef<'button'> & { show?: boolean };

/**
 * @see {@link Field}
 */
type FieldContents = { Legend: typeof FieldLegend };
type FieldProps = ComponentPropsWithoutRef<'fieldset'>;
type FieldLegendProps = ComponentPropsWithoutRef<'legend'>;

/**
 * @see {@link Question}
 */
type QuestionContents = { Set: typeof QuestionSet };
type QuestionSetProps = ComponentPropsWithoutRef<'div'>;
type QuestionProps = ComponentPropsWithoutRef<'label'>;

/**
 * @see {@link Answer}
 */
type AnswerContents = {
  Input: typeof Input;
  Select: typeof Select;
  TextArea: typeof TextArea;
  Label: typeof Label;
  Message: typeof Message;
};
type SelectContents = { OptionGroup: typeof OptionGroup; Option: typeof Option };
type InputContents = { DataList: typeof DataList };
export type AnswerProps = ComponentPropsWithoutRef<'div'>;
type InputProps = ComponentPropsWithoutRef<'input'>;
type SelectProps = ComponentPropsWithoutRef<'select'>;
type TextAreaProps = ComponentPropsWithoutRef<'textarea'>;
type LabelProps = ComponentPropsWithoutRef<'label'>;
type MessageProps = ComponentPropsWithoutRef<'div'> & {
  messages: Record<string, string>;
  msgType?: string;
};

/**
 * @see {@link OptionGroup}
 */
type OptionGroupContents = { Option: typeof Option };
type OptionGroupProps = ComponentPropsWithoutRef<'optgroup'>;
type OptionProps = ComponentPropsWithoutRef<'option'>;

/**
 * @see {@link DataList}
 */
type DataListContents = { Option: typeof Option };
type DataListProps = ComponentPropsWithoutRef<'datalist'>;

/**
 * @see {@link Output}
 */
type OutputContents = { Label: typeof Label; Text: typeof Text; Meter: typeof Meter };
export type OutputProps = ComponentPropsWithoutRef<'div'>;
type OutputTextProps = ComponentPropsWithoutRef<'output'>;
type OutputMeterProps = ComponentPropsWithoutRef<'meter'>;

/* List of Molecules */
/**
 * @see {@link FormContents}
 * @example Form
 * @example Form.Reset
 * @example Form.Submit
 * @example Form.Cancel
 */
export const Form: React.FC<FormProps> & FormContents = ({ children, onSubmit, ...rest }) => {
  const submitHandler: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    onSubmit?.(e);
  };

  return (
    <form {...rest} onSubmit={submitHandler}>
      {children}
    </form>
  );
};
const FormReset: React.FC<FormResetProps> = ({ children, ...rest }) => {
  return (
    <button {...rest} type="reset">
      {children}
    </button>
  );
};
const FormSubmit: React.FC<FormSubmitProps> = ({ children, ...rest }) => {
  return (
    <button {...rest} type="submit">
      {children}
    </button>
  );
};
const FormCancel: React.FC<FormCancelProps> = ({ children, show, ...rest }) => {
  return !show ? null : (
    <button {...rest} type="button">
      {children}
    </button>
  );
};

/**
 * @see {@link FieldContents}
 * @example Field
 * @example Field.Legend
 */
export const Field: React.FC<FieldProps> & FieldContents = ({ children, ...rest }) => {
  return <fieldset {...rest}>{children}</fieldset>;
};
const FieldLegend: React.FC<FieldLegendProps> = ({ children, ...rest }) => {
  return <legend {...rest}>{children}</legend>;
};

/**
 * @see {@link QuestionContents}
 * @example Question
 * @example Question.Set
 */
export const Question: React.FC<QuestionProps> & QuestionContents = ({
  children,
  htmlFor,
  ...rest
}) => {
  return (
    <label {...rest} htmlFor={htmlFor}>
      {children}
    </label>
  );
};
const QuestionSet: React.FC<QuestionSetProps> = ({ children, ...rest }) => {
  return <div {...rest}>{children}</div>;
};

/**
 * @see {@link AnswerContents}
 * @example Answer
 * @example Answer.Input
 * @example Answer.Select
 * @example Answer.TextArea
 * @example Answer.Label
 * @example Answer.Message
 */
export const Answer: React.FC<AnswerProps> & AnswerContents = ({ children, ...rest }) => {
  return <div {...rest}>{children}</div>;
};
const Input: React.FC<InputProps> & InputContents = ({ onInvalid, ...rest }) => {
  const invalidHandler: FormEventHandler<HTMLInputElement> = e => {
    e.preventDefault();
    onInvalid?.(e);
  };
  return <input {...rest} onInvalid={invalidHandler} />;
};
const Select: React.FC<SelectProps> & SelectContents = ({ children, ...rest }) => {
  return <select {...rest}>{children}</select>;
};
const TextArea: React.FC<TextAreaProps> = ({ children, onInvalid, ...rest }) => {
  const invalidHandler: FormEventHandler<HTMLTextAreaElement> = e => {
    e.preventDefault();
    onInvalid?.(e);
  };
  return (
    <textarea {...rest} onInvalid={invalidHandler}>
      {children}
    </textarea>
  );
};
const Message: React.FC<MessageProps> = ({ messages, msgType, ...rest }) => {
  return !msgType ? null : <div {...rest}>{messages[msgType]} </div>;
};
export const Label: React.FC<LabelProps> = ({ children, htmlFor, ...rest }) => {
  return (
    <label {...rest} htmlFor={htmlFor}>
      {children}
    </label>
  );
};

/**
 * @see {@link OptionGroupContents}
 * @example OptionGroup
 * @example OptionGroup.Option
 */
const OptionGroup: React.FC<OptionGroupProps> & OptionGroupContents = ({ children, ...rest }) => {
  return <optgroup {...rest}>{children}</optgroup>;
};
const Option: React.FC<OptionProps> = ({ children, ...rest }) => {
  return <option {...rest}>{children}</option>;
};

/**
 * @see {@link DataListContents}
 * @example DataList
 * @example DataList.Option
 */
const DataList: React.FC<DataListProps> & DataListContents = ({ children, ...rest }) => {
  return <datalist {...rest}>{children}</datalist>;
};

/**
 * @see {@link OutputContents}
 * @example Output
 * @example Output.Text
 * @example Output.Meter
 */
export const Output: React.FC<OutputProps> & OutputContents = ({ children }) => {
  return <div>{children}</div>;
};
const Text: React.FC<OutputTextProps> = ({ ...rest }) => {
  return <output {...rest} />;
};
const Meter: React.FC<OutputMeterProps> = ({ ...rest }) => {
  return <meter {...rest} />;
};

/* Setting for Molecules */
/**
 * @see {@link FormContents}
 * @see {@link Form}
 */
Form.Reset = FormReset;
Form.Submit = FormSubmit;
Form.Cancel = FormCancel;

/**
 * @see {@link FieldContents}
 * @see {@link Field}
 */
Field.Legend = FieldLegend;

/**
 * @see {@link QuestionContents}
 * @see {@link Question}
 */
Question.Set = QuestionSet;

/**
 * @see {@link AnswerContents}
 * @see {@link Answer}
 */
Answer.Input = Input;
Answer.Select = Select;
Answer.TextArea = TextArea;
Answer.Message = Message;
Answer.Label = Label;

/** @see {@link InputContents} */
Input.DataList = DataList;

/** @see {@link SelectContents} */
Select.Option = Option;
Select.OptionGroup = OptionGroup;

/**
 * @see {@link OptionGroupContents}
 * @see {@link OptionGroup}
 */
OptionGroup.Option = Option;

/**
 * @see {@link DataListContents}
 * @see {@link DataList}
 */
DataList.Option = Option;

/**
 * @see {@link OutputContents}
 * @see {@link Output}
 */
Output.Label = Label;
Output.Meter = Meter;
Output.Text = Text;
