export const handleDynamicHeight = (
  myRef: React.RefObject<HTMLTextAreaElement>
) => {
  if (myRef.current?.style) {
    // myRef.current.style.transition = "height 150ms"
    myRef.current.style.height = 0 + "px";
    myRef.current.style.height = myRef.current.scrollHeight + "px";
  }
  setTimeout(() => {
    if (myRef.current?.style) {
      myRef.current.style.height = 0 + "px";
      myRef.current.style.height = myRef.current.scrollHeight + "px";
    }
  }, 100);
  setTimeout(() => {
    if (myRef.current?.style) {
      myRef.current.style.height = 0 + "px";
      myRef.current.style.height = myRef.current.scrollHeight + "px";
    }
  }, 300);
};
