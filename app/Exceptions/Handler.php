<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class Handler extends ExceptionHandler
{
    /**
     * A list of exception types with their corresponding custom log levels.
     *
     * @var array<class-string<\Throwable>, \Psr\Log\LogLevel::*>
     */
    protected $levels = [];

    /**
     * A list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }

    public function render($request, Throwable $exception): Response
    {
        if ($exception instanceof \Symfony\Component\HttpKernel\Exception\NotFoundHttpException) {
            return resolve('404');
        }

        if ($exception instanceof \Symfony\Component\HttpKernel\Exception\HttpException) {
            $statusCode = $exception->getStatusCode();
            if ($statusCode === 500) {
                return resolve('500');
            }
            return resolve('httpError', $statusCode);
        }

        return parent::render($request, $exception);
    }

    // public function render($request, Throwable $exception): Response
    // {
    //     if ($exception instanceof \Symfony\Component\HttpKernel\Exception\NotFoundHttpException) {
    //         return Inertia::render('Errors/504')->toResponse($request);
    //     }

    //     if ($exception instanceof \Symfony\Component\HttpKernel\Exception\HttpException && $exception->getStatusCode() === 500) {
    //         return Inertia::render('Errors/500')->toResponse($request);
    //     }

    //     if ($exception instanceof \Symfony\Component\HttpKernel\Exception\HttpException && $exception->getStatusCode() === 504) {
    //         return Inertia::render('Errors/504')->toResponse($request);
    //     }

    //     // Generic error handling for other HTTP exceptions
    //     if ($exception instanceof \Symfony\Component\HttpKernel\Exception\HttpException) {
    //         return Inertia::render('Errors/Default', [
    //             'status' => $exception->getStatusCode(),
    //             'message' => $exception->getMessage(),
    //         ])->toResponse($request);
    //     }

    //     return parent::render($request, $exception);
    // }
}
