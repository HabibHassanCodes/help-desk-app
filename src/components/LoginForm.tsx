import React, { FC } from 'react';

export const LoginForm: FC = () => {

    return (
        <div className="form2">
            <h2>Login</h2>
            <form>
                <label htmlFor="username">Name:</label>
                <br />
                <input type="text" id="username" />
                <br />
                <label htmlFor="password">Email:</label>
                <br />
                <input type="text" id="password" />
                <br />
                <button type="submit">Submit</button>
                <button type="button" id="resetButton">Reset</button>
            </form>
        </div>
    )
}