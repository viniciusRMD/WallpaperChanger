#include <windows.h>
#include <stdio.h>
#include <iostream>
#define btn 1
const char g_szClassName[] = "myWindowClass";
const char ico[] = "C:\\Users\\Vinicius\\Documents\\JAVASCRIPT\\wallpaperchanger\\src\\rm.ico";

using namespace std;
void addcrontrols(HWND);
// Step 4: the Window Procedure

void HideConsole()
{
    ::ShowWindow(::GetConsoleWindow(), SW_HIDE);
}



LRESULT CALLBACK WndProc(HWND hwnd, UINT msg, WPARAM wParam, LPARAM lParam)
{
    switch(msg)
    {
        case WM_COMMAND:
            switch (wParam)
            {
            case btn:
                printf("teste");
                system ("CALL %cd%\\getwallpaper.dll");
                break;
                default:
                    break;
            }
        case WM_CREATE:
            addcrontrols(hwnd);
            break;
        case WM_CLOSE:
            DestroyWindow(hwnd);
        break;
        case WM_DESTROY:
            PostQuitMessage(0);
        break;
        default:
            return DefWindowProc(hwnd, msg, wParam, lParam);
    }
    return 0;
}

int WINAPI WinMain(HINSTANCE hInstance, HINSTANCE hPrevInstance, LPSTR lpCmdLine, int nCmdShow)
{
      WNDCLASSEX wc;
    HWND hwnd;
    MSG Msg;

    //Step 1: Registering the Window Class
    wc.cbSize        = sizeof(WNDCLASSEX);
    wc.style         = 0;
    wc.lpfnWndProc   = WndProc;
    wc.cbClsExtra    = 0;
    wc.cbWndExtra    = 0;
    wc.hInstance     = hInstance;
   // wc.hIcon         = LoadIcon(ico, IDI_APPLICATION);
    wc.hCursor       = LoadCursor(NULL, IDC_ARROW);
    wc.hIcon = LoadIcon(hInstance, "A");/*Load a standard icon*/
    wc.hIconSm = LoadIcon(hInstance, "A");/* use the name "A" to use the project icon */
    wc.hbrBackground = (HBRUSH)(COLOR_WINDOW+1);
    wc.lpszMenuName  = NULL;
    wc.lpszClassName = g_szClassName;
   // wc.hIconSm       = LoadIcon(NULL, IDI_APPLICATION);

    if(!RegisterClassEx(&wc))
    {
        MessageBox(NULL, "Window Registration Failed!", "Error!",
            MB_ICONEXCLAMATION | MB_OK);
        return 0;
    }

    // Step 2: Creating the Window
    hwnd = CreateWindowEx(
        WS_EX_CLIENTEDGE,
        g_szClassName,
        "Wllpaper Changer",
        WS_OVERLAPPEDWINDOW,
        CW_USEDEFAULT, CW_USEDEFAULT,300,200,
        NULL, NULL, hInstance, NULL);

    if(hwnd == NULL)
    {
        MessageBox(NULL, "Window Creation Failed!", "Error!",
            MB_ICONEXCLAMATION | MB_OK);
        return 0;
    }
    HideConsole();
    ShowWindow(hwnd, nCmdShow);
    
    //UpdateWindow();

    // Step 3: The Message Loop
    while(GetMessage(&Msg, NULL, 0, 0) > 0)
    {
        TranslateMessage(&Msg);
        DispatchMessage(&Msg);
    }
    return Msg.wParam;
}


void addcrontrols(HWND hwnd)
{
    CreateWindowW(L"static",L"Click No botao Para Mudar o Background",WS_VISIBLE | WS_CHILDWINDOW ,SS_CENTER,1,300,30, hwnd,NULL,NULL,NULL);
    CreateWindowW(L"Button",L"Next Wallpaper",WS_CHILD | WS_VISIBLE,50,31,120,50,hwnd,(HMENU)btn,NULL,NULL);
    CreateWindowW(L"static",L"Codded by Vinicius_RMD",WS_VISIBLE | WS_CHILDWINDOW ,50,81,100,50, hwnd,NULL,NULL,NULL);
    //CreateWindowW(L"edit",L"...",WS_VISIBLE | WS_CHILD | ES_MULTILINE | ES_AUTOHSCROLL | WS_BORDER ,200,100,200,50, hwnd,NULL,NULL,NULL);
   // CreateWindowW(L"Button",L"next Wallpaper",WS_CHILD | WS_VISIBLE,200,204,100,50,hwnd,(HMENU)btn,NULL,NULL);
}