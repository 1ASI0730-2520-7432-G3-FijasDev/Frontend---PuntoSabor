export async function sendMessageUseCase(payload){
    // mock: no backend, solo delay
    await new Promise(r=>setTimeout(r,400));
    return { ok:true };
}
