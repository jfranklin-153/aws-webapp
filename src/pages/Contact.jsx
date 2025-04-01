const Contact = () => {
    return (<form>
        <input type="text"></input>
        <button type="submit">Contact!</button>
    </form>);
}

export const ContactMe = () => {
    return (
        <form>
            <label for="contactField">Contact</label>
            <input type="radio" name="contactField"/>
            <button type="submit"/>
        </form>
    );
}

export default Contact