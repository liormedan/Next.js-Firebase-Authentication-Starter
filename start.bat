@echo off
REM Firebase Auth Starter - Windows Batch Startup Script
REM This is a wrapper for the PowerShell script

powershell.exe -ExecutionPolicy Bypass -File "%~dp0start.ps1" %*

