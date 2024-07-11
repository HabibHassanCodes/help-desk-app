import React, { FC } from 'react';

export const HelpRequestForm: FC = () => {

    return (
        <div className="form">
            <h2>HTML Forms</h2>
            <form>
                <label htmlFor="name">Name:</label>
                <br />
                <input type="text" id="name" />
                <br />
                <label htmlFor="email">Email:</label>
                <br />
                <input type="email" id="email" />
                <br />
                <label htmlFor="description">Description:</label>
                <br />
                <input type="description" id="description" />
                <br />
                <button type="submit">Submit</button>
                <button type="button" id="resetButton">Reset</button>
            </form>
        </div>
    )
}