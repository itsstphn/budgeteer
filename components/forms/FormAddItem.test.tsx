// filepath: c:\Users\Stephen\Desktop\my-projects\budgeteer\components\forms\FormAddItem.test.tsx

describe('FormAddItem', () => {
  const mockHandleCloseModal = jest.fn();
  const mockHandleSubmit = jest.fn((e) => e.preventDefault());
  const mockSetIsRecurring = jest.fn();

  const defaultProps = {
    value: 'item',
    handleCloseModal: mockHandleCloseModal,
    handleSubmit: mockHandleSubmit,
    setIsRecurring: mockSetIsRecurring,
    isRecurring: false,
  };

  beforeEach(() => {
    render(<FormAddItem {...defaultProps} />);
  });

  test('renders correctly', () => {
    expect(screen.getByText('Add Item')).toBeInTheDocument();
    expect(screen.getByLabelText('Name:')).toBeInTheDocument();
    expect(screen.getByLabelText('Amount:')).toBeInTheDocument();
    expect(screen.getByLabelText('Recurring')).toBeInTheDocument();
  });

  test('updates name input value', () => {
    const nameInput = screen.getByLabelText('Name:');
    fireEvent.change(nameInput, { target: { value: 'Test Name' } });
    expect(nameInput).toHaveValue('Test Name');
  });

  test('updates amount input value', () => {
    const amountInput = screen.getByLabelText('Amount:');
    fireEvent.change(amountInput, { target: { value: '100' } });
    expect(amountInput).toHaveValue(100);
  });

  test('toggles recurring checkbox', () => {
    const recurringCheckbox = screen.getByLabelText('Recurring');
    fireEvent.click(recurringCheckbox);
    expect(mockSetIsRecurring).toHaveBeenCalledWith(true);
  });

  test('submits the form', () => {
    const form = screen.getByRole('form');
    fireEvent.submit(form);
    expect(mockHandleSubmit).toHaveBeenCalled();
  });
