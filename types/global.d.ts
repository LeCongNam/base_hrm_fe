export {}; // Đảm bảo rằng file này là mô-đun (module)

declare global {
  type TPayloadGetList<T> = Partial<T> & {
    take?: number;
    skip?: number;
  };

  type FormProps = {
    onSubmit: (data) => void;
    isReset: boolean;
    onResetDone: () => void;
  };
}
